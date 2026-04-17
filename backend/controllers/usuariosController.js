import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  getAllUsuarios,
  getUsuarioById,
  getUsuarioByEmail,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from "../models/usuariosModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

export const listarUsuarios = (req, res) => {
  getAllUsuarios((err, result) => {
    if (err) {
      console.error("Error listarUsuarios:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
};

export const obtenerUsuario = (req, res) => {
  const id = req.params.id;
  getUsuarioById(id, (err, result) => {
    if (err) {
      console.error("Error obtenerUsuario:", err);
      return res.status(500).json({ error: err.message });
    }
    if (!result || result.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(result[0]);
  });
};

export const registrarUsuario = (req, res) => {
  const { nombre, apellido, email, password, telefono, direccion, tipo } = req.body;
  if (!nombre || !email || !password) return res.status(400).json({ error: "Nombre, email y password son requeridos" });

  // verificar si existe
  getUsuarioByEmail(email, (err, rows) => {
    if (err) {
      console.error("Error getUsuarioByEmail:", err);
      return res.status(500).json({ error: err.message });
    }
    if (rows && rows.length > 0) return res.status(409).json({ error: "El email ya está registrado" });

    // hashear contraseña
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    createUsuario({ nombre, apellido, email, password: hash, telefono, direccion, tipo }, (err2, result) => {
      if (err2) {
        console.error("Error createUsuario:", err2);
        return res.status(500).json({ error: err2.message });
      }
      res.status(201).json({ message: "Usuario registrado correctamente", id: result.insertId });
    });
  });
};

export const loginUsuario = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email y password requeridos" });

  getUsuarioByEmail(email, (err, rows) => {
    if (err) {
      console.error("Error getUsuarioByEmail:", err);
      return res.status(500).json({ error: err.message });
    }
    if (!rows || rows.length === 0) return res.status(401).json({ error: "Credenciales inválidas" });

    const user = rows[0];
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ error: "Credenciales inválidas" });

    // token (payload ágil)
    const payload = { idUsuario: user.idUsuario, email: user.email, tipo: user.tipo };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // devolver sin password
    delete user.password;
    res.json({ message: "Autenticación exitosa", token, user });
  });
};

export const editarUsuario = (req, res) => {
  const id = req.params.id;
  updateUsuario(id, req.body, (err, result) => {
    if (err) {
      console.error("Error editarUsuario:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Usuario actualizado" });
  });
};

export const eliminarUsuario = (req, res) => {
  const id = req.params.id;
  deleteUsuario(id, (err, result) => {
    if (err) {
      console.error("Error eliminarUsuario:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Usuario eliminado" });
  });
};
