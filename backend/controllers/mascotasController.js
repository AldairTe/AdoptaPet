import { getAllMascotas, getMascotaById, createMascota, updateMascota, deleteMascota } from "../models/mascotasModel.js";

export const listarMascotas = (req, res) => {
  getAllMascotas((err, result) => {
    if (err) {
      console.error("Error al listar mascotas:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};

export const obtenerMascota = (req, res) => {
  const id = req.params.id;
  getMascotaById(id, (err, result) => {
    if (err) {
      console.error("Error al obtener mascota:", err);
      return res.status(500).json({ error: err.message });
    }
    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }
    res.json(result[0]); // Devolvemos solo el primer resultado
  });
};

export const registrarMascota = (req, res) => {
  createMascota(req.body, (err, result) => {
    if (err) {
      console.error("Error al registrar mascota:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      message: "Mascota registrada correctamente",
      id: result.insertId 
    });
  });
};

export const editarMascota = (req, res) => {
  const id = req.params.id;
  updateMascota(id, req.body, (err, result) => {
    if (err) {
      console.error("Error al actualizar mascota:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Mascota actualizada correctamente" });
  });
};

export const eliminarMascota = (req, res) => {
  const id = req.params.id;
  deleteMascota(id, (err, result) => {
    if (err) {
      console.error("Error al eliminar mascota:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Mascota eliminada correctamente" });
  });
};