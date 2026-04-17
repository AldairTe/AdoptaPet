import express from "express";
import { 
  listarMascotas, 
  obtenerMascota,
  registrarMascota, 
  editarMascota, 
  eliminarMascota 
} from "../controllers/mascotasController.js";

const router = express.Router();

router.get("/", listarMascotas);
router.get("/:id", obtenerMascota);
router.post("/", registrarMascota);
router.put("/:id", editarMascota);
router.delete("/:id", eliminarMascota);

export default router;