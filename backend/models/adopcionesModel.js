import db from "../db.js";

// Obtener todas las adopciones
export const getAllAdopciones = (callback) => {
  const sql = `
    SELECT 
      a.idAdopcion, 
      a.idSolicitud,
      a.fechaAdopcion,
      s.idUsuario,
      s.idMascota,
      s.estado AS estadoSolicitud,
      m.nombre AS nombreMascota,
      m.especie AS especieMascota,
      m.raza AS razaMascota,
      u.nombre AS nombreUsuario,
      u.apellido AS apellidoUsuario,
      u.email AS emailUsuario
    FROM Adopcion a
    INNER JOIN SolicitudAdopcion s ON a.idSolicitud = s.idSolicitud
    INNER JOIN Mascota m ON s.idMascota = m.idMascota
    INNER JOIN Usuario u ON s.idUsuario = u.idUsuario
    ORDER BY a.fechaAdopcion DESC
  `;
  db.query(sql, callback);
};

// Registrar nueva adopción
export const createAdopcion = (adopcion, callback) => {
  // Solo insertamos idSolicitud, fechaAdopcion se agrega automáticamente con DEFAULT
  const sql = "INSERT INTO Adopcion (idSolicitud) VALUES (?)";
  const values = [adopcion.idSolicitud];
  db.query(sql, values, callback);
};

// Actualizar adopción (en caso de que necesites modificar algo)
export const updateAdopcion = (id, adopcion, callback) => {
  const sql = "UPDATE Adopcion SET idSolicitud = ? WHERE idAdopcion = ?";
  const values = [adopcion.idSolicitud, id];
  db.query(sql, values, callback);
};

// Eliminar adopción
export const deleteAdopcion = (id, callback) => {
  db.query("DELETE FROM Adopcion WHERE idAdopcion = ?", [id], callback);
};