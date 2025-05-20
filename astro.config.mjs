import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import htaccessIntegration from "astro-htaccess";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://inode64.com",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    robotsTxt(),
    sitemap(),
    mdx(),
    htaccessIntegration({
      generateHtaccessFile: import.meta.env.GENERATE_HTACCESS_FILE === "true",
      errorPages: [{ code: 404, document: "/404.html" }],
      redirects: [
        { match: "^\\/info\\/donde-estamos$", url: "/contact", code: 301 },
        { match: "^\\/sobre-nosotros\\/contacto$", url: "/contact", code: 301 },
        { match: "^\\/sobre-nosotros\\/boletines$", url: "/contact", code: 301 },
        { match: "^\\/tienda$", url: "/", code: 301 },
        { match: "^\\/info\\/servicios$", url: "/services", code: 301 },
        {
          match: "^\\/info\\/administracion-de-sistemas-informaticos-para-empresas$",
          url: "/services/mantenimiento-de-sistemas-linux-empresarial",
          code: 301,
        },
        { match: "^\\/info\\/hospedaje-web-basico$", url: "/services/hosting-web-de-alto-rendimiento", code: 301 },
        {
          match: "^\\/info\\/servicios-en-la-nube$",
          url: "/services/hosting-web-empresarial-alto-rendimiento-seguro",
          code: 301,
        },
        {
          match: "^\\/info\\/escuela-20$",
          url: "/services/gestión-integral-infraestructura-it-empresarial",
          code: 301,
        },
        {
          match: "^\\/info\\/marketing-online-seo-sem$",
          url: "/services/consultoría-analítica-web-optimización-conversion",
          code: 301,
        },
        {
          match: "^\\/info\\/instalaciones-de-redes-inalambricas-wifi$",
          url: "/services/soluciones-wifi-empresarial-seguras-alto-rendimiento",
          code: 301,
        },
        {
          match: "^\\/info\\/instalador-guifi-net$",
          url: "/services/soluciones-wifi-empresarial-seguras-alto-rendimiento",
          code: 301,
        },
        {
          match: "^\\/guias\\/seguridad\\/php-5-6-y-las-conexiones-seguras-ssl-tls$",
          url: "/blog/php-5-6-y-las-conexiones-seguras-ssl-tls",
          code: 301,
        },
        {
          match: "^\\/guias\\/ii-congreso-internacional-de-viveros-de-empresa-cartagena-2014$",
          url: "/blog/ii-congreso-internacional-de-viveros-de-empresa-cartagena-2014",
          code: 301,
        },
        {
          match: "^\\/guias\\/impresiones-de-resetweekend-2014$",
          url: "/blog/impresiones-de-resetweekend-2014",
          code: 301,
        },
        {
          match: "^\\/guias\\/inode64-colabora-en-lan-party-vilanet-2014-9-12-octubre-2014$",
          url: "/blog/inode64-colabora-en-lan-party-vilanet-2014-9-12-octubre-2014",
          code: 301,
        },
        { match: "^\\/guias\\/guifi-net-una-buena-opcion$", url: "/blog/guifi-net-una-buena-opción", code: 301 },
        {
          match: "^\\/guias\\/inode64-selecciona-a-g-data-como-mejor-antivirus$",
          url: "/blog/inode64-selecciona-a-g-data-como-mejor-antivirus",
          code: 301,
        },
        {
          match:
            "^\\/codigo\\/joomla\\/virtuemart-paypal-y-la-programacion-php-en-un-entorno-de-proxy-inverso-reverse-proxy$",
          url: "/blog/virtuemart-paypal-y-la-programación-php-en-un-entorno-de-proxy-inverso-reverse-proxy",
          code: 301,
        },
        {
          match: "^\\/guias\\/seguridad\\/migracion-de-servidores-gentoo-de-32bits-a-64bits$",
          url: "/blog/migración-de-servidores-gentoo-de-32bits-a-64bits",
          code: 301,
        },
        {
          match: "^\\/guias\\/1-congreso-internacional-de-viveros-de-empresas$",
          url: "/blog/i-congreso-internacional-de-viveros-de-empresas",
          code: 301,
        },
        {
          match: "^\\/guias\\/seguridad\\/nueva-era-de-malware-ransomware$",
          url: "/blog/nueva-era-de-malware-ransomware",
          code: 301,
        },
        {
          match:
            "^\\/guias\\/seguridad\\/grave-problema-de-seguridad-con-virtuemart-1-1-4-a-1-1-9-de-envio-masivo-de-correo$",
          url: "/blog/problema-de-seguridad-con-virtuemart-1-1-4-a-1-1-9-de-envió-masivo-de-correo",
          code: 301,
        },
        {
          match: "^\\/guias\\/asistimos-a-las-jornadas-vilaempren$",
          url: "/blog/asistimos-a-las-jornadas-vilaemprèn",
          code: 301,
        },
        {
          match: "^\\/guias\\/inode64-colabora-en-lan-party-vilanet-2013-11-12-y-13-octubre$",
          url: "/blog/inode64-colabora-en-lan-party-vilanet-2013-11-12-y-13-octubre",
          code: 301,
        },
        {
          match: "^\\/guias\\/seguridad\\/autenticacion-ldap-y-polkit$",
          url: "/blog/autenticación-ldap-y-polkit",
          code: 301,
        },
        {
          match: "^\\/guias\\/seguridad\\/script-de-actualizacion-de-seguridad-critica-para-joomla-1-5-26$",
          url: "/blog/script-de-actualización-de-seguridad-critica-para-joomla-1-5-26",
          code: 301,
        },
        { match: "^\\/guias\\/migrando-a-mariadb-en-gentoo$", url: "/blog/migrando-a-mariadb-en-gentoo", code: 301 },
        {
          match: "^\\/guias\\/buscamos-un-perfil-de-programador-web-en-php$",
          url: "/blog/buscamos-un-perfil-de-programador-web-en-php",
          code: 301,
        },
        {
          match: "^\\/guias\\/joomla\\/protege-tu-joomla-contra-los-hackers$",
          url: "/blog/protege-tu-joomla-contra-los-hackers",
          code: 301,
        },
        { match: "^\\/guias\\/por-que-gentoo$", url: "/blog/por-que-gentoo", code: 301 },
        {
          match: "^\\/codigo\\/joomla\\/comparativa-entre-joomla-2-5-y-3-0-php-5-3-y-php-5-4$",
          url: "/blog/comparativa-entre-joomla-2-5-y-3-0-php-5-3-y-php-5-4",
          code: 301,
        },
        {
          match: "^\\/guias\\/convertir-maquinas-virtuales-de-microsoft-virtual-pc-a-kvm$",
          url: "/blog/convertir-maquinas-virtuales-de-microsoft-virtual-pc-a-kvm",
          code: 301,
        },
        { match: "^\\/guias\\/raid5-no-gracias$", url: "/blog/raid5-no-gracias", code: 301 },
        {
          match: "^\\/guias\\/galeria-de-arbolitos-de-navidad$",
          url: "/blog/galería-de-arbolitos-de-navidad",
          code: 301,
        },
        {
          match: "^\\/codigo\\/joomla\\/sincronizar-tablas-en-mysql$",
          url: "/blog/sincronizar-tablas-en-mysql",
          code: 301,
        },
        {
          match: "^\\/guias\\/la-experiencia-de-la-iweekend-castellon-2012$",
          url: "/blog/la-experiencia-de-la-iweekend-castellón-2012",
          code: 301,
        },
        {
          match: "^\\/codigo\\/joomla\\/virtuemart-15-las-cookies-y-el-seo$",
          url: "/blog/virtuemart-15-las-cookies-y-el-seo",
          code: 301,
        },
        { match: "^\\/guias\\/iweekend-2012$", url: "/blog/iweekend-2012", code: 301 },
        { match: "^\\/guias\\/socialmediaday-castellon$", url: "/blog/socialmediaday-castellón", code: 301 },
        {
          match: "^\\/guias\\/jornadas-enredate-castellon-2012$",
          url: "/blog/jornadas-enrédate-castellón-2012",
          code: 301,
        },
        {
          match: "^\\/blog\\/joomla-15-y-el-error-de-mail-tls$",
          url: "/blog/joomla-15-y-el-error-de-mail-tls",
          code: 301,
        },
        {
          match: "^\\/prensa\\/mediterraneo-fotografia-en-un-cpd-trabajando$",
          url: "/blog/mediterráneo-fotografía-en-cpd-trabajando",
          code: 301,
        },
        { match: "^\\/blog\\/en-agosto-no-cerramos$", url: "/blog/en-agosto-no-cerramos", code: 301 },
        {
          match: "^\\/guias\\/como-es-atacado-un-joomla-2-parte$",
          url: "/blog/como-es-atacado-un-joomla-2-parte",
          code: 301,
        },
        {
          match: "^\\/blog\\/como-es-atacado-un-joomla-2-parte\\/como-es-atacado-un-joomla$",
          url: "/blog/como-es-atacado-un-joomla-2-parte",
          code: 301,
        },
        {
          match: "^\\/codigo\\/joomla\\/componente-content_fake-para-la-creacion-de-contenidos-falsos$",
          url: "/blog/componente-content-fake-para-la-creación-de-contenidos-falsos",
          code: 301,
        },
        { match: "^\\/guias\\/como-es-atacado-un-joomla$", url: "/blog/como-es-atacado-un-joomla", code: 301 },
        {
          match: "^\\/guias\\/cuando-el-villarreal-cf-baja-el-trafico-de-red-sube$",
          url: "/blog/cuando-el-villarreal-cf-baja-el-tráfico-de-red-sube",
          code: 301,
        },
        { match: "^\\/guias\\/drivers-de-kvm-para-windows$", url: "/blog/drivers-de-kvm-para-windows", code: 301 },
        {
          match: "^\\/guias\\/sbs-2008-y-las-contrasenas-de-sql$",
          url: "/blog/sbs-2008-y-las-contraseñas-de-sql",
          code: 301,
        },
        {
          match: "^\\/prensa\\/consulta-sobre-el-acceso-a-internet-en-mediterraneo-de-castellon$",
          url: "/blog/consulta-sobre-el-acceso-a-internet-en-mediterráneo-de-castellón",
          code: 301,
        },
        {
          match: "^\\/codigo\\/joomla\\/metodo-de-pago-virtual-ruralvia-en-virtuemart-con-sermepa$",
          url: "/blog/método-de-pago-virtual-ruralvía-en-virtuemart-con-sermepa",
          code: 301,
        },
        {
          match: "^\\/guias\\/como-montar-una-imagen-kvm-con-ntfs3g$",
          url: "/blog/como-montar-una-imagen-kvm-con-ntfs3g",
          code: 301,
        },
        {
          match: "^\\/guias\\/cuando-un-entrenador-se-va-y-otro-vuelve-apache-sufre-mas$",
          url: "/blog/cuando-un-entrenador-se-va-y-otro-vuelve-apache-sufre-mas",
          code: 301,
        },
        {
          match: "^\\/codigo\\/joomla\\/como-mejorar-la-seguridad-de-tu-web-en-joomla$",
          url: "/blog/como-mejorar-la-seguridad-de-tu-web-en-joomla",
          code: 301,
        },
        {
          match: "^\\/guias\\/convertir-maquinas-virtuales-vmware-a-kvm$",
          url: "/blog/convertir-maquinas-virtuales-vmware-a-kvm",
          code: 301,
        },
        {
          match: "^\\/guias\\/comparativa-tecnica-web-de-partidos-politicos$",
          url: "/blog/comparativa-técnica-web-de-partidos-politicos",
          code: 301,
        },
        { match: "^\\/guias\\/comparativa-python-26-vs-27$", url: "/blog/comparativa-python-26-vs-27", code: 301 },
        {
          match: "^\\/guias\\/windows-7-y-la-conectilidad-limitada-a-internet$",
          url: "/blog/windows-7-y-la-conectividad-limitada-a-internet",
          code: 301,
        },
        { match: "^\\/prensa\\/entrevista-en-el-pais$", url: "/blog/entrevista-en-el-país", code: 301 },
        { match: "^\\/codigo\\/joomla\\/joomla-15-update$", url: "/blog/joomla-15-update", code: 301 },
        {
          match: "^\\/guias\\/como-desploquear-el-puerto-25-smtp-en-los-routes-adsl-de-telefonica$",
          url: "/blog/como-desbloquear-el-puerto-25-smtp-en-los-routes-adsl-de-telefonica",
          code: 301,
        },
        { match: "^\\/codigo\\/joomla\\/plugin-update-language$", url: "/blog/plugin-update-language", code: 301 },
        {
          match: "^\\/guias\\/requerir-contrasena-para-apagar-o-reiniciar-el-equipo-en-gentoo$",
          url: "/blog/requerir-contraseña-para-apagar-o-reiniciar-el-equipo-en-gentoo",
          code: 301,
        },
        {
          match: "^\\/guias\\/buenas-practicas-en-programacion-web-xhtml$",
          url: "/blog/buenas-practicas-en-programación-web-xhtml",
          code: 301,
        },
        {
          match: "^\\/guias\\/envio-de-mensajes-desde-php-internacionalizado$",
          url: "/blog/envió-de-mensajes-desde-php-internacionalizado",
          code: 301,
        },
        {
          match: "^\\/prensa\\/asistencia-al-i-congreso-abierto-y-virtual-2020$",
          url: "/blog/asistencia-al-i-congreso-abierto-y-virtual-2020",
          code: 301,
        },
        {
          match: "^\\/prensa\\/resena-en-el-periodico-mediterraneo$",
          url: "/blog/reseña-en-el-periódico-mediterráneo",
          code: 301,
        },
        {
          match: "^\\/prensa\\/comentario-en-periodico-mediterraneo$",
          url: "/blog/comentario-en-periódico-mediterráneo",
          code: 301,
        },
        { match: "^\\/prensa\\/reportaje-en-el-mediterraneo$", url: "/blog/reportaje-en-el-mediterráneo", code: 301 },
        {
          match: "^\\/oferta-de-empleo$",
          url: "/contact",
          code: 301,
        },
        {
          match: "^\\/sobre-nosotros\\/contacto",
          url: "/contact",
          code: 301,
        },
        {
          match: "^\\/codigo\\/joomla",
          url: "/blog",
          code: 301,
        },
        {
          match: "^\\/tag\\/",
          url: "/blog",
          code: 301,
        },
      ],
    }),
  ],
});
