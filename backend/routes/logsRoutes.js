import express from "express";
import { registrarLog, listarLogs } from "../controllers/logsController.js";

const router = express.Router();

router.get("/", listarLogs);
router.post("/", registrarLog);

export default router;
