import express from "express";
import { listarSolicitudes, registrarSolicitud, actualizarEstadoSolicitud, eliminarSolicitud } from "../controllers/solicitudesController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, listarSolicitudes);
router.post("/", verifyToken, registrarSolicitud);
router.put("/:id/estado", verifyToken, requireRole("administrador"), actualizarEstadoSolicitud);
router.delete("/:id", verifyToken, requireRole("administrador"), eliminarSolicitud);

export default router;
