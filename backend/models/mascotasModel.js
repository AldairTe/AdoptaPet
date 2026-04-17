import db from "../db.js";

export const getAllMascotas = (callback) => {
  const sql = `
    SELECT 
      m.*,
      r.idRefugio,
      r.nombre AS nombreRefugio,
      r.direccion AS direccionRefugio,
      r.telefono AS telefonoRefugio,
      r.email AS emailRefugio,
      r.encargado AS encargadoRefugio
    FROM Mascota m
    LEFT JOIN Refugio r ON m.idRefugio = r.idRefugio
    ORDER BY m.fechaRegistro DESC
  `;
  db.query(sql, callback);
};

export const getMascotaById = (id, callback) => {
  const sql = `
    SELECT 
      m.*,
      r.idRefugio,
      r.nombre AS nombreRefugio,
      r.direccion AS direccionRefugio,
      r.telefono AS telefonoRefugio,
      r.email AS emailRefugio,
      r.encargado AS encargadoRefugio
    FROM Mascota m
    LEFT JOIN Refugio r ON m.idRefugio = r.idRefugio
    WHERE m.idMascota = ?
  `;
  db.query(sql, [id], callback);
};

export const createMascota = (mascota, callback) => {
  const sql = "INSERT INTO Mascota (nombre, especie, raza, edad, sexo, descripcion, imagen, estado, idRefugio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    mascota.nombre, 
    mascota.especie, 
    mascota.raza, 
    mascota.edad, 
    mascota.sexo,
    mascota.descripcion,
    mascota.imagen,
    mascota.estado || 'disponible',
    mascota.idRefugio
  ];
  db.query(sql, values, callback);
};

export const updateMascota = (id, mascota, callback) => {
  const sql = "UPDATE Mascota SET nombre=?, especie=?, raza=?, edad=?, sexo=?, descripcion=?, imagen=?, estado=?, idRefugio=? WHERE idMascota=?";
  const values = [
    mascota.nombre, 
    mascota.especie, 
    mascota.raza, 
    mascota.edad,
    mascota.sexo,
    mascota.descripcion,
    mascota.imagen,
    mascota.estado, 
    mascota.idRefugio, 
    id
  ];
  db.query(sql, values, callback);
};

export const deleteMascota = (id, callback) => {
  db.query("DELETE FROM Mascota WHERE idMascota=?", [id], callback);
};