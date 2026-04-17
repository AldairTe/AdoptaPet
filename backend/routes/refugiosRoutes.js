import express from "express";
import { listarRefugios, registrarRefugio, editarRefugio, eliminarRefugio } from "../controllers/refugiosController.js";

const router = express.Router();

router.get("/", listarRefugios);
router.post("/", registrarRefugio);
router.put("/:id", editarRefugio);
router.delete("/:id", eliminarRefugio);

export default router;
