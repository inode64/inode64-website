<?php
declare(strict_types=1);

use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;

function env_value(string $name, ?string $default = null): ?string
{
    $value = getenv($name);
    if ($value === false && isset($_SERVER[$name])) {
        $value = (string) $_SERVER[$name];
    }
    if ($value === false || $value === '') {
        return $default;
    }

    return trim((string) $value);
}

function wants_json(): bool
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    $requestedWith = $_SERVER['HTTP_X_REQUESTED_WITH'] ?? '';

    return str_contains($accept, 'application/json') || strcasecmp($requestedWith, 'XMLHttpRequest') === 0;
}

function respond(int $status, string $message, bool $success = false): never
{
    http_response_code($status);
    header('Cache-Control: no-store');

    if (wants_json()) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(
            [
                'success' => $success,
                'message' => $message,
            ],
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        exit;
    }

    if ($success) {
        header('Location: /contact/success', true, 303);
        exit;
    }

    header('Location: /contact', true, 303);
    exit;
}

function normalize_line(string $value): string
{
    $value = str_replace(["\r\n", "\r"], "\n", trim($value));
    $value = preg_replace("/\n{3,}/", "\n\n", $value);

    return trim((string) $value);
}

function clean_header_value(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

function verify_hcaptcha(string $secret, string $sitekey, string $response, string $remoteIp): bool
{
    $payload = http_build_query(
        [
            'secret' => $secret,
            'sitekey' => $sitekey,
            'response' => $response,
            'remoteip' => $remoteIp,
        ]
    );

    if (function_exists('curl_init')) {
        $ch = curl_init('https://api.hcaptcha.com/siteverify');
        curl_setopt_array(
            $ch,
            [
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => $payload,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT => 10,
                CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
            ]
        );
        $raw = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);

        if (!is_string($raw) || $status < 200 || $status >= 300) {
            return false;
        }
    } else {
        $context = stream_context_create(
            [
                'http' => [
                    'method' => 'POST',
                    'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
                    'content' => $payload,
                    'timeout' => 10,
                ],
            ]
        );
        $raw = @file_get_contents('https://api.hcaptcha.com/siteverify', false, $context);
        if (!is_string($raw) || $raw === '') {
            return false;
        }
    }

    $decoded = json_decode($raw, true);

    return is_array($decoded) && ($decoded['success'] ?? false) === true;
}

function rate_limit_check(string $ip): bool
{
    $file = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'inode64-contact-' . hash('sha256', $ip);
    $windowSeconds = 900;
    $maxAttempts = 5;
    $now = time();
    $attempts = [];

    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        throw new RuntimeException('Cannot open contact rate limit storage.');
    }

    try {
        // Keep the read and write under one lock so parallel requests share the same limit.
        if (!flock($handle, LOCK_EX)) {
            throw new RuntimeException('Cannot lock contact rate limit storage.');
        }
        $stored = json_decode((string) stream_get_contents($handle), true);
        if (is_array($stored)) {
            foreach ($stored as $attempt) {
                if (is_int($attempt) && ($attempt + $windowSeconds) > $now) {
                    $attempts[] = $attempt;
                }
            }
        }
        if (count($attempts) >= $maxAttempts) {
            return false;
        }

        $attempts[] = $now;
        $encoded = json_encode($attempts);
        if (!rewind($handle) || !ftruncate($handle, 0) || fwrite($handle, $encoded) !== strlen($encoded)) {
            throw new RuntimeException('Cannot update contact rate limit storage.');
        }

        return true;
    } finally {
        fclose($handle);
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, 'Método no permitido.');
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 65536) {
    respond(413, 'El mensaje es demasiado largo.');
}

$autoloadPath = dirname(__DIR__, 2) . '/vendor/autoload.php';
if (!is_file($autoloadPath)) {
    error_log('inode64 contact form: Composer autoload is missing.');
    respond(503, 'El formulario no está disponible temporalmente.');
}

require_once $autoloadPath;

$allowedOrigins = env_value('CONTACT_ALLOWED_ORIGINS', env_value('CONTACT_ALLOWED_ORIGIN'));
if ($allowedOrigins === null) {
    error_log('inode64 contact form: Allowed origins are not configured.');
    respond(503, 'El formulario no está disponible temporalmente.');
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === '' && isset($_SERVER['HTTP_REFERER'])) {
    $referer = parse_url($_SERVER['HTTP_REFERER']);
    if (is_array($referer) && isset($referer['scheme'], $referer['host'])) {
        $origin = $referer['scheme'] . '://' . $referer['host'];
        if (isset($referer['port'])) {
            $origin .= ':' . $referer['port'];
        }
    }
}
if (!in_array($origin, array_map('trim', explode(',', $allowedOrigins)), true)) {
    respond(403, 'Origen de envío no permitido.');
}

$remoteIp = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
try {
    if (!rate_limit_check($remoteIp)) {
        respond(429, 'Demasiados intentos. Espere unos minutos antes de reenviar el formulario.');
    }
} catch (RuntimeException $exception) {
    error_log('inode64 contact form: ' . $exception->getMessage());
    respond(503, 'El formulario no está disponible temporalmente.');
}

$fieldLimits = [
    'nombre' => 400,
    'apellidos' => 600,
    'email' => 254,
    'phone' => 200,
    'mensaje' => 20000,
    'botcheck' => 200,
    'privacy_accepted' => 3,
    'h-captcha-response' => 16384,
];
foreach ($fieldLimits as $field => $maxBytes) {
    $value = $_POST[$field] ?? '';
    if (!is_string($value) || strlen($value) > $maxBytes) {
        respond(422, 'Los datos del formulario no son válidos o son demasiado largos.');
    }
}

$botcheck = trim((string) ($_POST['botcheck'] ?? ''));
if ($botcheck !== '') {
    respond(400, 'Solicitud no válida.');
}

$nombre = normalize_line((string) ($_POST['nombre'] ?? ''));
$apellidos = normalize_line((string) ($_POST['apellidos'] ?? ''));
$email = clean_header_value((string) ($_POST['email'] ?? ''));
$phone = normalize_line((string) ($_POST['phone'] ?? ''));
$mensaje = normalize_line((string) ($_POST['mensaje'] ?? ''));
$privacyAccepted = (string) ($_POST['privacy_accepted'] ?? '') === 'yes';
$captchaResponse = trim((string) ($_POST['h-captcha-response'] ?? ''));

if ($nombre === '' || $apellidos === '' || $phone === '' || $mensaje === '') {
    respond(422, 'Debe completar todos los campos obligatorios.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, 'Debe indicar un correo electrónico válido.');
}

if (!$privacyAccepted) {
    respond(422, 'Debe aceptar la política de privacidad.');
}

$captchaSecret = env_value('CONTACT_HCAPTCHA_SECRET');
$captchaSitekey = env_value('CONTACT_HCAPTCHA_SITEKEY');
if ($captchaSecret === null || $captchaSitekey === null) {
    error_log('inode64 contact form: hCaptcha is not configured.');
    respond(503, 'El formulario no está disponible temporalmente.');
}

if ($captchaResponse === '' || !verify_hcaptcha($captchaSecret, $captchaSitekey, $captchaResponse, $remoteIp)) {
    respond(422, 'No se ha podido validar el captcha.');
}

$recipient = env_value('CONTACT_FORM_TO_EMAIL', env_value('SENDER_CONTACT_EMAIL'));
$fromEmail = env_value('CONTACT_FORM_FROM_EMAIL', $recipient);
$fromName = env_value('CONTACT_FORM_FROM_NAME', 'INODE64');
$mailerDsn = env_value('MAILER_DSN', env_value('CONTACT_MAILER_DSN'));

if ($recipient === null || !filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
    error_log('inode64 contact form: Recipient is not configured.');
    respond(503, 'El formulario no está disponible temporalmente.');
}

if ($fromEmail === null || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
    error_log('inode64 contact form: Sender is not configured.');
    respond(503, 'El formulario no está disponible temporalmente.');
}

if ($mailerDsn === null) {
    error_log('inode64 contact form: Mailer transport is not configured.');
    respond(503, 'El formulario no está disponible temporalmente.');
}

$fullName = trim($nombre . ' ' . $apellidos);
$subject = 'Nueva consulta desde inode64.com';

$body = implode(
    "\n",
    [
        "Nueva consulta recibida desde el formulario web de INODE64.",
        '',
        "Nombre: {$fullName}",
        "Email: {$email}",
        "Teléfono: {$phone}",
        "IP: {$remoteIp}",
        '',
        'Mensaje:',
        $mensaje,
    ]
);

try {
    $transport = Transport::fromDsn($mailerDsn);
    $mailer = new Mailer($transport);
    $message = (new Email())
        ->from(new Address($fromEmail, clean_header_value($fromName)))
        ->to(new Address($recipient))
        ->replyTo(new Address($email, clean_header_value($fullName)))
        ->subject($subject)
        ->text($body);

    $mailer->send($message);
} catch (TransportExceptionInterface | Throwable $exception) {
    error_log('inode64 contact form: ' . $exception->getMessage());
    respond(500, 'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.');
}

respond(200, 'Mensaje enviado correctamente.', true);
