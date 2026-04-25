import express from "express";
import { registrarLog, listarLogs } from "../controllers/logsController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, requireRole("administrador"), listarLogs);
router.post("/", verifyToken, registrarLog);

export default router;