import { getAllRefugios, createRefugio, updateRefugio, deleteRefugio } from "../models/refugiosModel.js";

export const listarRefugios = (req, res) => {
  getAllRefugios((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

export const registrarRefugio = (req, res) => {
  createRefugio(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Refugio registrado correctamente" });
  });
};

export const editarRefugio = (req, res) => {
  updateRefugio(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Refugio actualizado correctamente" });
  });
};

export const eliminarRefugio = (req, res) => {
  deleteRefugio(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Refugio eliminado correctamente" });
  });
};
