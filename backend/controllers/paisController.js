/**
 * Controlador para manejar las peticiones relacionadas con el modelo "Pais".
 * Define funciones para obtener todos los países y agregar un nuevo país.
 */

const PaisModel = require('../models/paisModel');

/**
 * Obtiene la lista de todos los países y la retorna como respuesta JSON.
 */
async function getPaises(req, res) {
  try {
    const paises = await PaisModel.getAllPaises();
    res.json(paises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Agrega un nuevo país usando los datos recibidos en el cuerpo de la petición.
 */
async function addPais(req, res) {
  try {
    const newPais = await PaisModel.createPais(req.body);
    res.status(201).json(newPais);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getPaises, addPais };