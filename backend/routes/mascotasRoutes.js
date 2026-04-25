import express from "express";
import { 
  listarMascotas, 
  obtenerMascota,
  registrarMascota, 
  editarMascota, 
  eliminarMascota 
} from "../controllers/mascotasController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", listarMascotas);
router.get("/:id", obtenerMascota);

router.post("/", verifyToken, requireRole("administrador"), registrarMascota);
router.put("/:id", verifyToken, requireRole("administrador"), editarMascota);
router.delete("/:id", verifyToken, requireRole("administrador"), eliminarMascota);

export default router;