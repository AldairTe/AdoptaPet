import express from "express";
import { listarRefugios, registrarRefugio, editarRefugio, eliminarRefugio } from "../controllers/refugiosController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", listarRefugios);

router.post("/", verifyToken, requireRole("administrador"), registrarRefugio);
router.put("/:id", verifyToken, requireRole("administrador"), editarRefugio);
router.delete("/:id", verifyToken, requireRole("administrador"), eliminarRefugio);

export default router;