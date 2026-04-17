import db from "../db.js";

export const getAllSolicitudes = (callback) => {
  const sql = `
    SELECT 
      s.idSolicitud, 
      s.fechaSolicitud, 
      s.estado, 
      s.mensaje,
      s.idUsuario,
      s.idMascota,
      u.nombre AS nombreUsuario,
      u.apellido AS apellidoUsuario,
      u.email AS emailUsuario,
      u.telefono AS telefonoUsuario,
      m.nombre AS nombreMascota,
      m.especie AS especieMascota,
      m.raza AS razaMascota,
      m.imagen AS imagenMascota
    FROM SolicitudAdopcion s
    JOIN Usuario u ON s.idUsuario = u.idUsuario
    JOIN Mascota m ON s.idMascota = m.idMascota
    ORDER BY s.fechaSolicitud DESC
  `;
  db.query(sql, callback);
};

export const createSolicitud = (solicitud, callback) => {
  const sql = "INSERT INTO SolicitudAdopcion (idUsuario, idMascota, mensaje) VALUES (?, ?, ?)";
  const values = [solicitud.idUsuario, solicitud.idMascota, solicitud.mensaje || null];
  db.query(sql, values, callback);
};

export const getSolicitudById = (id, callback) => {
  const sql = `
    SELECT 
      s.*,
      u.nombre AS nombreUsuario,
      u.apellido AS apellidoUsuario,
      u.email AS emailUsuario,
      m.nombre AS nombreMascota,
      m.especie AS especieMascota,
      m.raza AS razaMascota
    FROM SolicitudAdopcion s
    JOIN Usuario u ON s.idUsuario = u.idUsuario
    JOIN Mascota m ON s.idMascota = m.idMascota
    WHERE s.idSolicitud = ?
  `;
  db.query(sql, [id], callback);
};

export const updateSolicitudEstado = (id, estado, callback) => {
  db.query("UPDATE SolicitudAdopcion SET estado = ? WHERE idSolicitud = ?", [estado, id], callback);
};

export const deleteSolicitud = (id, callback) => {
  db.query("DELETE FROM SolicitudAdopcion WHERE idSolicitud = ?", [id], callback);
};