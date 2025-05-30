/**
 * Define las rutas para las operaciones relacionadas con "Sitio".
 * Usa el controlador de sitio para manejar las peticiones GET y POST.
 */

const express = require('express');
const router = express.Router();
const sitioController = require('../controllers/sitioController');

// Ruta para obtener todos los sitios
router.get('/', sitioController.getSitios);

// Ruta para agregar un nuevo sitio
router.post('/', sitioController.addSitio);

module.exports = router;