/**
 * Define las rutas para las operaciones relacionadas con "Famoso".
 * Usa el controlador de famoso para manejar las peticiones GET y POST.
 */

const express = require('express');
const router = express.Router();
const famosoController = require('../controllers/famosoController');

// Ruta para obtener todos los famosos
router.get('/', famosoController.getFamosos);

// Ruta para agregar un nuevo famoso
router.post('/', famosoController.addFamoso);

module.exports = router;