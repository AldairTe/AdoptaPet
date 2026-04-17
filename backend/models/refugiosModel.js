import db from "../db.js";

export const getAllRefugios = (callback) => {
  db.query("SELECT * FROM Refugio", callback);
};

export const createRefugio = (refugio, callback) => {
  const sql = "INSERT INTO Refugio (nombre, direccion, telefono, email, encargado) VALUES (?, ?, ?, ?, ?)";
  const values = [refugio.nombre, refugio.direccion, refugio.telefono, refugio.email, refugio.encargado];
  db.query(sql, values, callback);
};

export const updateRefugio = (id, refugio, callback) => {
  const sql = "UPDATE Refugio SET nombre=?, direccion=?, telefono=?, email=?, encargado=? WHERE idRefugio=?";
  const values = [refugio.nombre, refugio.direccion, refugio.telefono, refugio.email, refugio.encargado, id];
  db.query(sql, values, callback);
};

export const deleteRefugio = (id, callback) => {
  db.query("DELETE FROM Refugio WHERE idRefugio=?", [id], callback);
};
