/**
 * Controlador para manejar las peticiones relacionadas con el modelo "Sitio".
 * Define funciones para obtener todos los sitios y agregar un nuevo sitio.
 */

const SitioModel = require('../models/sitioModel');

/**
 * Obtiene la lista de todos los sitios y la retorna como respuesta JSON.
 */
async function getSitios(req, res) {
  try {
    const sitios = await SitioModel.getAllSitios();
    res.json(sitios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Agrega un nuevo sitio usando los datos recibidos en el cuerpo de la petición.
 */
async function addSitio(req, res) {
  try {
    const newSitio = await SitioModel.createSitio(req.body);
    res.status(201).json(newSitio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getSitios, addSitio };