/**
 * Define las rutas para las operaciones relacionadas con "Tag".
 * Usa el controlador de tag para manejar las peticiones GET y POST.
 */

const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// Ruta para obtener todos los tags
router.get('/', tagController.getTags);

// Ruta para agregar un nuevo tag
router.post('/', tagController.addTag);

module.exports = router;