// Modifica temporalmente tu db.js para más detalles
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error DETAILED de conexión:", {
      code: err.code,
      errno: err.errno,
      sqlMessage: err.sqlMessage,
      sqlState: err.sqlState
    });
  } else {
    console.log("✅ Conexión exitosa a MySQL");
    console.log("Base de datos:", process.env.DB_NAME);
  }
});

db.on('error', (err) => {
  console.error('❌ Error general de DB:', err);
});

export default db;