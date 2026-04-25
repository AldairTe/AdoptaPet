import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";

// Importar rutas
import mascotasRoutes from "./routes/mascotasRoutes.js";
import refugiosRoutes from "./routes/refugiosRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import solicitudesRoutes from "./routes/solicitudesRoutes.js";
import adopcionesRoutes from "./routes/adopcionesRoutes.js";
import logsRoutes from "./routes/logsRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Verificar conexión
db.connect(err => {
  if (err) {
    console.error("Error al conectar a MySQL:", err);
  } else {
    console.log("Conexión exitosa a MySQL");
  }
});

// Rutas principales
app.use('/uploads', express.static('uploads'));
app.use("/api/mascotas", mascotasRoutes);
app.use("/api/refugios", refugiosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/solicitudes", solicitudesRoutes);
app.use("/api/adopciones", adopcionesRoutes);
app.use("/api/logs", logsRoutes);

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
