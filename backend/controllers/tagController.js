/**
 * Controlador para manejar las peticiones relacionadas con el modelo "Tag".
 * Define funciones para obtener todos los tags y agregar un nuevo tag.
 */

const TagModel = require('../models/tagModel');

/**
 * Obtiene la lista de todos los tags y la retorna como respuesta JSON.
 */
async function getTags(req, res) {
  try {
    const tags = await TagModel.getAllTags();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Agrega un nuevo tag usando los datos recibidos en el cuerpo de la petición.
 */
async function addTag(req, res) {
  try {
    const newTag = await TagModel.createTag(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getTags, addTag };
