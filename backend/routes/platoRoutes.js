/**
 * Define las rutas para las operaciones relacionadas con "Plato".
 * Usa el controlador de plato para manejar las peticiones GET y POST.
 */

const express = require('express');
const router = express.Router();
const platoController = require('../controllers/platoController');

// Ruta para obtener todos los platos
router.get('/', platoController.getPlatos);

// Ruta para agregar un nuevo plato
router.post('/', platoController.addPlato);

module.exports = router;