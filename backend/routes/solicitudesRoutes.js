import express from "express";
import { listarSolicitudes, registrarSolicitud, actualizarEstadoSolicitud, eliminarSolicitud } from "../controllers/solicitudesController.js";

const router = express.Router();

router.get("/", listarSolicitudes);
router.post("/", registrarSolicitud);
router.put("/:id/estado", actualizarEstadoSolicitud); // cambiar estado (aprobada/rechazada)
router.delete("/:id", eliminarSolicitud);

export default router;
