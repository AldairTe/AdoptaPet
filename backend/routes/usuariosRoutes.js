import express from "express";
import {
  listarUsuarios,
  obtenerUsuario,
  registrarUsuario,
  loginUsuario,
  editarUsuario,
  eliminarUsuario
} from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/", listarUsuarios);
router.get("/:id", obtenerUsuario);
router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);
router.put("/:id", editarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
