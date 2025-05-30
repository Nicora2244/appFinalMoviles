/**
 * Define las rutas para las operaciones relacionadas con "Ciudad".
 * Usa el controlador de ciudad para manejar las peticiones GET y POST.
 */

const express = require('express');
const router = express.Router();
const ciudadController = require('../controllers/ciudadController');

// Ruta para obtener todas las ciudades
router.get('/', ciudadController.getCiudades);

// Ruta para agregar una nueva ciudad
router.post('/', ciudadController.addCiudad);

module.exports = router;