/**
 * Controlador para manejar las peticiones relacionadas con el modelo "Usuario".
 * Define funciones para obtener todos los usuarios y agregar un nuevo usuario.
 */

const UsuarioModel = require('../models/usuarioModel');

/**
 * Obtiene la lista de todos los usuarios y la retorna como respuesta JSON.
 */
async function getUsuarios(req, res) {
  try {
    const usuarios = await UsuarioModel.getAllUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Agrega un nuevo usuario usando los datos recibidos en el cuerpo de la petición.
 */
async function addUsuario(req, res) {
  try {
    const newUsuario = await UsuarioModel.createUsuario(req.body);
    res.status(201).json(newUsuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getUsuarios, addUsuario };