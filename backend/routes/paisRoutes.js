/**
 * Define las rutas para las operaciones relacionadas con "Pais".
 * Usa el controlador de país para manejar las peticiones GET y POST.
 */

const express = require('express');
const router = express.Router();
const paisController = require('../controllers/paisController');

// Ruta para obtener todos los países
router.get('/', paisController.getPaises);

// Ruta para agregar un nuevo país
router.post('/', paisController.addPais);

module.exports = router;