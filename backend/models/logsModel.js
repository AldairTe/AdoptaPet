import db from "../db.js";

export const createLog = (log, callback) => {
  const sql = "INSERT INTO logacceso (idUsuario, accion) VALUES (?, ?)";
  const values = [log.idUsuario || null, log.accion || null];
  db.query(sql, values, callback);
};

export const getLogs = (callback) => {
  db.query("SELECT * FROM logacceso ORDER BY fecha DESC LIMIT 1000", callback);
};
