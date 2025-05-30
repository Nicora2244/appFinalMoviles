/**
 * Define las rutas para las operaciones relacionadas con "Visita".
 * Usa el controlador de visita para manejar las peticiones GET y POST.
 */

const express = require('express');
const router = express.Router();
const visitaController = require('../controllers/visitaController');

// Ruta para obtener todas las visitas
router.get('/', visitaController.getVisitas);

// Ruta para agregar una nueva visita
router.post('/', visitaController.addVisita);

module.exports = router;