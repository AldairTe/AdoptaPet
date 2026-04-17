import {
  getAllSolicitudes,
  createSolicitud,
  getSolicitudById,
  updateSolicitudEstado,
  deleteSolicitud
} from "../models/solicitudesModel.js";

import { createAdopcion } from "../models/adopcionesModel.js";
import db from "../db.js";

export const listarSolicitudes = (req, res) => {
  getAllSolicitudes((err, result) => {
    if (err) {
      console.error("Error listarSolicitudes:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};

export const registrarSolicitud = (req, res) => {
  const { idUsuario, idMascota, mensaje } = req.body;
  if (!idUsuario || !idMascota) return res.status(400).json({ error: "idUsuario e idMascota son requeridos" });

  // crear solicitud
  createSolicitud({ idUsuario, idMascota, mensaje }, (err, result) => {
    if (err) {
      console.error("Error createSolicitud:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Solicitud creada", id: result.insertId });
  });
};

// Aprobar o rechazar solicitud
export const actualizarEstadoSolicitud = (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;
  if (!estado) return res.status(400).json({ error: "Estado es requerido" });

  // Actualizar estado de la solicitud
  updateSolicitudEstado(id, estado, (err) => {
    if (err) {
      console.error("Error updateSolicitudEstado:", err);
      return res.status(500).json({ error: err.message });
    }

    // Si se aprueba, crear Adopcion y actualizar estado Mascota
    if (estado === "aprobada") {
      // obtener la solicitud para tomar idUsuario e idMascota
      getSolicitudById(id, (err2, rows) => {
        if (err2) {
          console.error("Error getSolicitudById:", err2);
          return res.status(500).json({ error: err2.message });
        }
        if (!rows || rows.length === 0) return res.status(404).json({ error: "Solicitud no encontrada" });

        const solicitud = rows[0];

        // Crear adopción SOLO con idSolicitud según tu estructura de BD
        const adopcionObj = {
          idSolicitud: solicitud.idSolicitud
          // fechaAdopcion se agrega automáticamente por DEFAULT CURRENT_TIMESTAMP
        };

        createAdopcion(adopcionObj, (err3, resultAdopcion) => {
          if (err3) {
            console.error("Error createAdopcion:", err3);
            return res.status(500).json({ error: err3.message });
          }

          // actualizar estado de la mascota a 'adoptado'
          db.query("UPDATE Mascota SET estado = 'adoptado' WHERE idMascota = ?", [solicitud.idMascota], (err4) => {
            if (err4) {
              console.error("Error actualizar estado mascota:", err4);
              return res.status(500).json({ error: err4.message });
            }

            return res.json({ 
              message: "Solicitud aprobada; adopción creada y mascota actualizada",
              idAdopcion: resultAdopcion.insertId
            });
          });
        });
      });
    } else {
      // si es rechazado o pendiente solo respondemos success
      return res.json({ message: `Solicitud actualizada a ${estado}` });
    }
  });
};

export const eliminarSolicitud = (req, res) => {
  const id = req.params.id;
  deleteSolicitud(id, (err) => {
    if (err) {
      console.error("Error eliminarSolicitud:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Solicitud eliminada" });
  });
};