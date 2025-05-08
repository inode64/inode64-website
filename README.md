# Página web de INODE64

## 1. Introducción

### 1.1. Objetivos de la web
Esta web representa la presencia digital de INODE64, ofreciendo información sobre sus servicios, proyectos, colaboradores, blog y recursos. Ha sido diseñada con un enfoque moderno, accesible y responsive.

### 1.2. Tecnologías utilizadas
- **Astro 5.7**: Framework principal para generación de sitios estáticos.
- **Tailwind CSS 4.0.9**: Sistema de utilidades CSS para el diseño.
- **TypeScript**: Para tipado estático y mayor mantenibilidad.
- **VS Code**: Editor recomendado para el desarrollo.

### 1.3. Estado del despliegue
Actualmente la web se encuentra desplegada temporalmente en Netlify: [https://tangerine-crumble-afbcfc.netlify.app](https://tangerine-crumble-afbcfc.netlify.app)

INODE64 tiene previsto realizar el despliegue final en sus propios servidores.

---

## 2. Entorno de desarrollo

### 2.1. Software necesario
- Node.js v20.11.1
- npm (v10 o superior)

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
```
├── public/                    # Recursos estáticos (favicon, logos, etc.)
├── src/                       # Código fuente principal
│   ├── components/            # Componentes Astro reutilizables
│   ├── content/               # Entradas del blog (MDX)
│   ├── data/                  # Archivos JSON con contenido estructurado
│   ├── layouts/               # Layouts base para secciones
│   ├── pages/                 # Páginas del sitio (rutas)
│   └── styles/                # Archivos CSS personalizados
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
El formulario de contacto se encuentra en la página `/contact` y utiliza el componente `FormContact.astro`, ubicado en `/src/components/forms/`. Este componente es modular, reutilizable y está diseñado con clases de Tailwind CSS.

Está integrado con Netlify Forms como solución temporal para gestionar envíos. En producción, puede conectarse a un endpoint personalizado para mayor control.

### 5.2. Newsletter
El formulario de suscripción al boletín se encuentra en el footer y utiliza también un componente separado. Funciona bajo el mismo sistema de envío que el formulario de contacto, con posibilidad de ampliación hacia servicios como Mailchimp o EmailOctopus.

### 5.3. Validaciones y endpoints
Actualmente las validaciones son de tipo HTML5 (`required`, `type="email"`, etc.). Se recomienda en el futuro implementar validaciones backend, filtrado anti-spam y seguridad adicional en endpoints.

### 5.4. Validaciones y endpoints
Además de las validaciones nativas en cliente, en producción se aconseja:
- Validación adicional en servidor
- Uso de honeypot o reCAPTCHA
- Sanitización de entradas y control de longitud
- Protección CSRF si se usan APIs externas

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
Para desplegar en los servidores de INODE64 se recomienda:
- Usar Nginx, Apache o similar para servir `/dist`
- Activar HTTPS (Let's Encrypt)
- Permitir redirecciones y compresión Gzip/Brotli
- Automatizar el despliegue con Git o CI/CD
- Hacer copias de seguridad del código y los datos

Alternativas de hosting: Netlify, Vercel, Cloudflare Pages, Firebase Hosting.

---

## Conclusión

Esta guía proporciona a INODE64 los conocimientos necesarios para gestionar y mantener su sitio web de forma autónoma. Gracias a la estructura clara, el uso de Astro y Tailwind CSS, y una arquitectura centrada en la modularidad y el contenido externo, el proyecto es fácilmente escalable y adaptable a futuras necesidades.

Para cualquier ampliación futura se recomienda seguir las prácticas establecidas aquí y consultar la documentación oficial de Astro y Tailwind.

---

© 2025 - INODE64 | Desarrollado por Roberto Galán
