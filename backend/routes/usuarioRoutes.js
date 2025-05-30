/**
 * Define las rutas para las operaciones relacionadas con "Usuario".
 * Usa el controlador de usuario para manejar las peticiones GET y POST.
 */

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para obtener todos los usuarios
router.get('/', usuarioController.getUsuarios);

// Ruta para agregar un nuevo usuario
router.post('/', usuarioController.addUsuario);

module.exports = router;