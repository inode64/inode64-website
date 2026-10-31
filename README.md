# Página web de INODE64

## 1. Introducción

### 1.1. Objetivos de la web

Esta web representa la presencia digital de INODE64, ofreciendo información sobre sus servicios, proyectos, colaboradores, blog y recursos. Ha sido diseñada con un enfoque moderno, accesible y responsive.

### 1.2. Tecnologías utilizadas

- **Astro 7**: Framework principal para generación de sitios estáticos.
- **Tailwind CSS 4.3**: Sistema de utilidades CSS para el diseño.
- **TypeScript**: Para tipado estático y mayor mantenibilidad.
- **VS Code**: Editor recomendado para el desarrollo.

### 1.3. Estado del despliegue

La web de producción está disponible en [https://inode64.com](https://inode64.com).

INODE64 tiene previsto realizar el despliegue final en sus propios servidores.

---

## 2. Entorno de desarrollo

### 2.1. Software necesario

- Node.js v22.23.4 o superior
- npm v9.6.5 o superior

Instalación de dependencias:

```bash
npm install
```

### 2.2. Extensiones útiles para VS Code

- Tailwind CSS IntelliSense
- Astro
- Prettier
- ESLint

### 2.3. Como levantar el proyecto localmente

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo en `http://localhost:4321`

### 2.4. Conocimientos recomendados

- HTML, CSS y JavaScript moderno
- Fundamentos de TypeScript
- Uso básico de Tailwind CSS
- Familiaridad con el enfoque de componentes

### 2.5. Estructura del proyecto

```text
├── public/                   # Recursos estáticos (favicon, logos, etc.)
├── src/                      # Código fuente principal
│   ├── components/           # Componentes Astro reutilizables
│   ├── content/              # Entradas del blog (MDX)
│   ├── data/                 # Archivos JSON con contenido estructurado
│   ├── layouts/              # Layouts base para secciones
│   ├── pages/                # Páginas del sitio (rutas)
│   └── styles/               # Archivos CSS personalizados
├── astro.config.mjs          # Configuración de Astro
├── tailwind.config.cjs       # Configuración de Tailwind CSS
├── tsconfig.json             # Configuración de TypeScript
└── package.json              # Dependencias y scripts
```

---

## 3. Gestión del contenido

### 3.1. Archivos JSON (/src/data/)

Contienen información de servicios, proyectos, preguntas frecuentes, recursos, etc. Son editables y permiten actualizar el contenido fácilmente sin tocar los componentes.

### 3.2. Entradas del blog (/src/content/blog/)

Cada entrada es un archivo `.md`. Se puede añadir una nueva entrada creando un nuevo archivo con los metadatos en el frontmatter (`title`, `description`, `author`, `tags`, `date`, etc.).

### 3.3. Configuración del sitio y SEO

Existe un archivo de configuración `seo-config.ts` donde se centralizan los metadatos por sección. Esto permite una gestión global del SEO y compartir estructura entre páginas.

---

## 4. Componentes y estilos

### 4.1. Layouts y componentes

Los `layouts` definen la estructura base de las páginas. Los componentes (`/components/`) encapsulan partes reutilizables como tarjetas, encabezados, formularios, etc.

### 4.2. Uso de Tailwind CSS

Se emplea Tailwind CSS como sistema principal de estilos. Todas las páginas usan clases utilitarias para definir colores, márgenes, tipografía, espaciado y breakpoints. Gracias a su integración con Astro, los estilos son extremadamente rápidos y personalizables.

Se ha aplicado `@layer` en algunos CSS para definir estilos base y personalizados (botones, formularios, tipografías).

### 4.3. Principios de diseño responsive

El sitio ha sido diseñado con un enfoque `mobile-first`, adaptándose a cualquier tipo de pantalla mediante los breakpoints de Tailwind (`sm`, `md`, `lg`, `xl`). Todos los layouts y componentes son 100% responsivos.

---

## 5. Formularios y funcionalidades

### 5.1. Formulario de contacto

El formulario está en `src/pages/contact/index.astro` y envía a `/contact/send.php`. El backend utiliza Symfony Mailer y requiere PHP 8.4.1 o posterior con cURL, iconv y OpenSSL. Astro genera la interfaz; el servidor web debe ejecutar el endpoint mediante PHP-FPM.

### 5.2. Validaciones y endpoints

El servidor valida campos, longitudes, aceptación de privacidad, honeypot, origen exacto y hCaptcha. Limita a cinco intentos por IP cada quince minutos mediante un directorio temporal privado y escribible por PHP. La interfaz conserva los datos ante errores y renueva el captcha para reintentar.

### 5.3. Configuración y comprobaciones

Copiar `.env.template` a `.env` y configurar `PUBLIC_HCAPTCHA_SITEKEY` antes de compilar. Registrar en hCaptcha los dominios que muestran el formulario. Sin sitekey, la interfaz muestra los medios alternativos de contacto y desactiva el envío.

Las variables de ejecución deben llegar al proceso PHP-FPM; PHP no carga `.env` automáticamente:

- `CONTACT_HCAPTCHA_SITEKEY`: la misma sitekey pública usada al compilar.
- `CONTACT_HCAPTCHA_SECRET`: secreto privado de hCaptcha, nunca una variable `PUBLIC_*`.
- `CONTACT_ALLOWED_ORIGINS`: orígenes HTTPS separados por comas, sin barra final, por ejemplo `https://inode64.com,https://www.inode64.com`.
- `MAILER_DSN`: transporte de Symfony. Para un MTA local que acepte correo desde loopback, puede usarse `smtp://127.0.0.1:25?auto_tls=false`; las conexiones a servidores remotos deben usar TLS. Con `sendmail://default`, comprobar que el MTA respeta el remitente de retorno y no lo sustituye por el usuario del proceso PHP.
- `CONTACT_FORM_TO_EMAIL`, `CONTACT_FORM_FROM_EMAIL` y `CONTACT_FORM_FROM_NAME`: destinatario y remitente propios. El correo del visitante se usa como `Reply-To`.

Instalar las dependencias PHP desde la raíz con `composer install --no-dev --prefer-dist --optimize-autoloader`. El DocumentRoot debe ser `dist/`, con `vendor/` y `.env` fuera del acceso público. Configurar un handler PHP para `/contact/send.php`, impedir servir otros archivos PHP como texto y limitar el cuerpo de la petición a 64 KiB. No usar claves de prueba de hCaptcha en producción.

`npm run preview` sirve archivos estáticos y no ejecuta PHP. Para comprobar el backend localmente, después de instalar Composer:

```bash
node --test tests/contact.test.mjs
```

Estas pruebas no envían correo ni consultan hCaptcha. Cubren validación, orígenes, configuración ausente y límite de intentos concurrentes. La entrega real requiere una prueba adicional con el MTA y hCaptcha configurados.

---

## 6. Despliegue y mantenimiento

### 6.1. Generación y despliegue de producción

Para compilar la web:

```bash
npm run build
```

Esto genera la carpeta `/dist` con los archivos estáticos. Puedes hacer una vista previa de producción con:

```bash
npm run preview
```

### 6.2. Recomendaciones para hosting propio

Desplegado en los propios servidores de INODE64, con las siguientes características:

- Uso de Apache 2.4.x para servir `/dist`
- HTTPS con (Let's Encrypt)
- Permitido el uso de redirecciones y compresión Gzip/Brotli
- Automatizar el despliegue con Git o CI/CD
- Copias de seguridad diarias y remotas del site

---

## Conclusión

Esta guía proporciona los conocimientos necesarios para gestionar y mantener su sitio web de forma autónoma. Gracias a la estructura clara, el uso de Astro y Tailwind CSS, y una arquitectura centrada en la modularidad y el contenido externo, el proyecto es fácilmente escalable y adaptable a futuras necesidades.

Para cualquier ampliación futura se recomienda seguir las prácticas establecidas aquí y consultar la documentación oficial de Astro y Tailwind.

---

© 2025 - INODE64 | Desarrollado por Roberto Galán
