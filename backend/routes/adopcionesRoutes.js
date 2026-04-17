import express from "express";
import {
  listarAdopciones,
  registrarAdopcion,
  editarAdopcion,
  eliminarAdopcion
} from "../controllers/adopcionesController.js";

const router = express.Router();

router.get("/", listarAdopciones);
router.post("/", registrarAdopcion);
router.put("/:id", editarAdopcion);
router.delete("/:id", eliminarAdopcion);

export default router;
