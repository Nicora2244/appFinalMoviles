/**
 * Controlador para manejar las peticiones relacionadas con el modelo "Personaje".
 * Define funciones para obtener todos los personajes y agregar un nuevo personaje.
 */

const PersonajeModel = require('../models/personajeModel');

/**
 * Obtiene la lista de todos los personajes y la retorna como respuesta JSON.
 */
async function getPersonajes(req, res) {
  try {
    const personajes = await PersonajeModel.getAllPersonajes();
    res.json(personajes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Agrega un nuevo personaje usando los datos recibidos en el cuerpo de la petición.
 */
async function addPersonaje(req, res) {
  try {
    const newPersonaje = await PersonajeModel.createPersonaje(req.body);
    res.status(201).json(newPersonaje);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getPersonajes, addPersonaje };