import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  allowExitOnIdle: true,
});

export const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta';

try {
  await pool.query("SELECT NOW()");
  console.log("Database conectada");
} catch (error) {
  console.log(error);
}