import db from "../db.js";

export const getAllUsuarios = (callback) => {
  db.query("SELECT idUsuario, nombre, apellido, email, telefono, direccion, tipo, fechaRegistro FROM Usuario", callback);
};

export const getUsuarioById = (id, callback) => {
  db.query("SELECT idUsuario, nombre, apellido, email, telefono, direccion, tipo, fechaRegistro FROM Usuario WHERE idUsuario = ?", [id], callback);
};

export const getUsuarioByEmail = (email, callback) => {
  db.query("SELECT * FROM Usuario WHERE email = ?", [email], callback);
};

export const createUsuario = (usuario, callback) => {
  const sql = "INSERT INTO Usuario (nombre, apellido, email, password, telefono, direccion, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [usuario.nombre, usuario.apellido, usuario.email, usuario.password, usuario.telefono || null, usuario.direccion || null, usuario.tipo || "adoptante"];
  db.query(sql, values, callback);
};

export const updateUsuario = (id, usuario, callback) => {
  const sql = "UPDATE Usuario SET nombre = ?, apellido = ?, telefono = ?, direccion = ?, tipo = ? WHERE idUsuario = ?";
  const values = [usuario.nombre, usuario.apellido, usuario.telefono, usuario.direccion, usuario.tipo, id];
  db.query(sql, values, callback);
};

export const deleteUsuario = (id, callback) => {
  db.query("DELETE FROM Usuario WHERE idUsuario = ?", [id], callback);
};
