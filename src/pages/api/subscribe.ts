import type { APIRoute } from 'astro';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root', 
  password: 'tu_contraseña', 
  database: 'nombre_de_base_de_datos', 
});

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();

  if (!email || !validateEmail(email)) {
    return new Response(
      JSON.stringify({ message: 'Correo electrónico inválido o no proporcionado' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    await saveEmailToDatabase(email);

    return new Response(
      JSON.stringify({ message: '¡Te has suscrito correctamente al newsletter!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al guardar el correo en la base de datos:', error);
    return new Response(
      JSON.stringify({ message: 'Hubo un error al guardar la suscripción.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

function validateEmail(email: string) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

async function saveEmailToDatabase(email: string) {
  const connection = await pool.getConnection();
  try {
    const query = 'INSERT INTO newsletter_subscriptions (email) VALUES (?)';
    await connection.execute(query, [email]);
  } finally {
    connection.release();
  }
}