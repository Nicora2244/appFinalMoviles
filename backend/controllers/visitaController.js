/**
 * Controlador para manejar las peticiones relacionadas con el modelo "Visita".
 * Define funciones para obtener todas las visitas y agregar una nueva visita.
 */

const VisitaModel = require('../models/visitaModel');

/**
 * Obtiene la lista de todas las visitas y la retorna como respuesta JSON.
 */
async function getVisitas(req, res) {
  try {
    const visitas = await VisitaModel.getAllVisitas();
    res.json(visitas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Agrega una nueva visita usando los datos recibidos en el cuerpo de la petición.
 */
async function addVisita(req, res) {
  try {
    const newVisita = await VisitaModel.createVisita(req.body);
    res.status(201).json(newVisita);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getVisitas, addVisita };
