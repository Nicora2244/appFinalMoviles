/**
 * Define las rutas para las operaciones relacionadas con "Personaje".
 * Usa el controlador de personaje para manejar las peticiones GET y POST.
 */

const express = require('express');
const router = express.Router();
const personajeController = require('../controllers/personajeController');

// Ruta para obtener todos los personajes
router.get('/', personajeController.getPersonajes);

// Ruta para agregar un nuevo personaje
router.post('/', personajeController.addPersonaje);

module.exports = router;