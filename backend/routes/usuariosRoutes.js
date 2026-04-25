import express from "express";
import {
  listarUsuarios,
  obtenerUsuario,
  registrarUsuario,
  loginUsuario,
  editarUsuario,
  eliminarUsuario
} from "../controllers/usuariosController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);

router.get("/", verifyToken, requireRole("administrador"), listarUsuarios);
router.delete("/:id", verifyToken, requireRole("administrador"), eliminarUsuario);

router.get("/:id", verifyToken, obtenerUsuario);
router.put("/:id", verifyToken, editarUsuario);

export default router;
