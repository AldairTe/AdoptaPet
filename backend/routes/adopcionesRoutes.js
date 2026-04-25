import express from "express";
import {
  listarAdopciones,
  registrarAdopcion,
  editarAdopcion,
  eliminarAdopcion
} from "../controllers/adopcionesController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, requireRole("administrador"), listarAdopciones);
router.put("/:id", verifyToken, requireRole("administrador"), editarAdopcion);
router.delete("/:id", verifyToken, requireRole("administrador"), eliminarAdopcion);

router.post("/", verifyToken, registrarAdopcion);

export default router;