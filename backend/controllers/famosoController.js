/**
 * Controlador para manejar las peticiones relacionadas con el modelo "Famoso".
 * Define funciones para obtener todos los famosos y agregar un nuevo famoso.
 */

const FamosoModel = require('../models/famosoModel');

/**
 * Obtiene la lista de todos los famosos y la retorna como respuesta JSON.
 */
async function getFamosos(req, res) {
  try {
    const famosos = await FamosoModel.getAllFamosos();
    res.json(famosos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Agrega un nuevo famoso usando los datos recibidos en el cuerpo de la petición.
 */
async function addFamoso(req, res) {
  try {
    const newFamoso = await FamosoModel.createFamoso(req.body);
    res.status(201).json(newFamoso);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getFamosos, addFamoso };
