import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const firstName = data.get("first-name")?.toString() ?? "";
  const lastName = data.get("last-name")?.toString() ?? "";
  const company = data.get("company")?.toString() ?? "";
  const email = data.get("email")?.toString() ?? "";
  const phone = data.get("phone-number")?.toString() ?? "";
  const message = data.get("message")?.toString() ?? "";

  try {
    const transporter = nodemailer.createTransport({
      service: import.meta.env.SMTP_HOST,
      port: Number(import.meta.env.SMTP_PORT),
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `${import.meta.env.SMTP_USER}`,
      to: `${import.meta.env.SENDER_CONTACT_EMAIL}`,
      subject: `${import.meta.env.SENDER_CONTACT_SUBJECT}`,
      text: `
Nombre: ${firstName} ${lastName}
Empresa: ${company}
Email: ${email}
Teléfono: ${phone}
Mensaje: ${message}
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Error al enviar correo:", err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
};
