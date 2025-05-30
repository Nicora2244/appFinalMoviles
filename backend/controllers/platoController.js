/**
 * Controlador para manejar las peticiones relacionadas con el modelo "Plato".
 * Define funciones para obtener todos los platos y agregar un nuevo plato.
 */

const PlatoModel = require('../models/platoModel');

/**
 * Obtiene la lista de todos los platos y la retorna como respuesta JSON.
 */
async function getPlatos(req, res) {
  try {
    const platos = await PlatoModel.getAllPlatos();
    res.json(platos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Agrega un nuevo plato usando los datos recibidos en el cuerpo de la petición.
 */
async function addPlato(req, res) {
  try {
    const newPlato = await PlatoModel.createPlato(req.body);
    res.status(201).json(newPlato);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getPlatos, addPlato };