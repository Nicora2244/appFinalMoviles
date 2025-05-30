/**
 * Controlador para manejar las peticiones relacionadas con el modelo "Ciudad".
 * Define funciones para obtener todas las ciudades y agregar una nueva ciudad.
 */

const CiudadModel = require('../models/ciudadModel');

/**
 * Obtiene la lista de todas las ciudades y la retorna como respuesta JSON.
 */
async function getCiudades(req, res) {
  try {
    const ciudades = await CiudadModel.getAllCiudades();
    res.json(ciudades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Agrega una nueva ciudad usando los datos recibidos en el cuerpo de la petición.
 */
async function addCiudad(req, res) {
  try {
    const newCiudad = await CiudadModel.createCiudad(req.body);
    res.status(201).json(newCiudad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getCiudades, addCiudad };