import { createLog, getLogs } from "../models/logsModel.js";

export const registrarLog = (req, res) => {
  const { idUsuario, accion } = req.body;
  createLog({ idUsuario, accion }, (err, result) => {
    if (err) {
      console.error("Error createLog:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Log registrado", id: result.insertId });
  });
};

export const listarLogs = (req, res) => {
  getLogs((err, rows) => {
    if (err) {
      console.error("Error getLogs:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};
