import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

const runner = `
$_SERVER = json_decode(getenv('TEST_SERVER'), true);
$_POST = json_decode(getenv('TEST_POST'), true);
register_shutdown_function(function () { fwrite(STDERR, "\\nSTATUS=" . http_response_code()); });
require getenv('TEST_ENDPOINT');
`;
const validFields = {
  nombre: "Prueba",
  apellidos: "Local",
  email: "test@example.invalid",
  phone: "000000000",
  mensaje: "Prueba sin entrega de correo",
  privacy_accepted: "yes",
};

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), "contact-test-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return async ({ fields = {}, server = {}, env = {}, storage = directory } = {}) => {
    const inherited = Object.fromEntries(
      Object.entries(process.env).filter(([key]) => !/^(CONTACT_|MAILER_|SENDER_CONTACT_)/.test(key)),
    );
    const child = spawn(process.env.PHP_BINARY || "php", ["-d", `sys_temp_dir=${storage}`, "-r", runner], {
      env: {
        ...inherited,
        MAILER_DSN: "null://null",
        CONTACT_ALLOWED_ORIGINS: "https://example.test,https://www.example.test",
        TEST_ENDPOINT: resolve("public/contact/send.php"),
        TEST_SERVER: JSON.stringify({
          REQUEST_METHOD: "POST",
          HTTP_ACCEPT: "application/json",
          HTTP_ORIGIN: "https://www.example.test",
          REMOTE_ADDR: "192.0.2.1",
          ...server,
        }),
        TEST_POST: JSON.stringify(fields),
        ...env,
      },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (data) => (stdout += data));
    child.stderr.on("data", (data) => (stderr += data));
    const exitCode = await new Promise((resolve, reject) => {
      child.on("error", reject);
      child.on("close", resolve);
    });
    assert.equal(exitCode, 0, stderr);
    const match = stderr.match(/STATUS=(\d+)/);
    assert.ok(match, stderr);
    return { status: Number(match[1]), body: JSON.parse(stdout) };
  };
}

test("GET is rejected as JSON", async (t) => {
  const request = await fixture(t);
  const response = await request({ server: { REQUEST_METHOD: "GET" } });
  assert.equal(response.status, 405);
  assert.equal(response.body.success, false);
});

test("origins are exact, with a parsed Referer fallback", async (t) => {
  const request = await fixture(t);
  for (const origin of ["https://www.example.test.attacker.test", "https://www.example.test@attacker.test", "null", "http://www.example.test", ""]) {
    assert.equal((await request({ server: { HTTP_ORIGIN: origin } })).status, 403);
  }
  for (const origin of ["https://example.test", "https://www.example.test"]) {
    assert.equal((await request({ server: { HTTP_ORIGIN: origin } })).status, 422);
  }
  assert.equal((await request({ server: { HTTP_ORIGIN: "", HTTP_REFERER: "https://www.example.test/contact/" } })).status, 422);
  assert.equal((await request({ server: { HTTP_ORIGIN: "", HTTP_REFERER: "https://www.example.test.attacker.test/contact/" } })).status, 403);
});

test("missing origin configuration fails closed", async (t) => {
  const request = await fixture(t);
  assert.equal((await request({ env: { CONTACT_ALLOWED_ORIGINS: "" } })).status, 503);
});

test("invalid fields and honeypot cannot reach the transport", async (t) => {
  const request = await fixture(t);
  for (const fields of [{}, { ...validFields, email: "invalid" }, { ...validFields, privacy_accepted: "no" }, { ...validFields, nombre: ["array"] }]) {
    assert.equal((await request({ fields })).status, 422);
  }
  assert.equal((await request({ fields: { ...validFields, botcheck: "bot" } })).status, 400);
});

test("request and field lengths are bounded", async (t) => {
  const request = await fixture(t);
  assert.equal((await request({ server: { CONTENT_LENGTH: "65537" } })).status, 413);
  assert.equal((await request({ fields: { ...validFields, mensaje: "x".repeat(20001) } })).status, 422);
});

test("unconfigured captcha fails closed without exposing configuration details", async (t) => {
  const request = await fixture(t);
  const response = await request({ fields: validFields });
  assert.equal(response.status, 503);
  assert.equal(response.body.message, "El formulario no está disponible temporalmente.");
});

test("missing captcha token is rejected before any external request", async (t) => {
  const request = await fixture(t);
  assert.equal((await request({ fields: validFields, env: { CONTACT_HCAPTCHA_SECRET: "fixture", CONTACT_HCAPTCHA_SITEKEY: "fixture" } })).status, 422);
});

test("parallel requests share the five-attempt limit", async (t) => {
  const request = await fixture(t);
  const responses = await Promise.all(Array.from({ length: 12 }, () => request()));
  assert.equal(responses.filter((response) => response.status === 422).length, 5);
  assert.equal(responses.filter((response) => response.status === 429).length, 7);
});

test("unavailable rate limit storage fails closed", async (t) => {
  const request = await fixture(t);
  assert.equal((await request({ storage: "/nonexistent-contact-test-directory" })).status, 503);
});
