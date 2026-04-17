import {
  getAllAdopciones,
  createAdopcion,
  updateAdopcion,
  deleteAdopcion
} from "../models/adopcionesModel.js";

export const listarAdopciones = (req, res) => {
  getAllAdopciones((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

export const registrarAdopcion = (req, res) => {
  createAdopcion(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✅ Adopción registrada correctamente" });
  });
};

export const editarAdopcion = (req, res) => {
  updateAdopcion(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✏️ Adopción actualizada correctamente" });
  });
};

export const eliminarAdopcion = (req, res) => {
  deleteAdopcion(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑️ Adopción eliminada correctamente" });
  });
};
