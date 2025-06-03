/**
 * Este archivo define funciones para interactuar con la base de datos Neo4j
 * relacionadas con el modelo "Personaje". Permite obtener todos los personajes y crear
 * nuevos registros de personajes asociados a una ciudad y a un famoso.
 */

const driver = require('../neo4j');

/**
 * Obtiene todos los nodos de tipo "Personaje" de la base de datos.
 * @returns {Promise<Array>} Lista de personajes.
 */
async function getAllPersonajes() {
  const session = driver.session();
  try {
    const result = await session.run(`MATCH (p:Personaje) RETURN p`);
    return result.records.map(r => r.get('p').properties);
  } finally {
    await session.close();
  }
}

/**
 * Crea un nuevo nodo "Personaje" y lo asocia a una ciudad y a un famoso existente.
 * @param {Object} data - Datos del personaje (nombre, tipo, nacimiento, ciudadNombre, motivoFama).
 * @returns {Promise<Object>} El personaje creado.
 */
async function createPersonaje(data) {
  const session = driver.session();
  try {
    const { nombre, tipo, nacimiento, ciudadNombre, motivoFama } = data;
    const result = await session.run(
      `
      MATCH (c:Ciudad {nombre: $ciudadNombre}), (f:Famoso {motivo: $motivoFama})
      CREATE (p:Personaje {
        nombre: $nombre,
        tipo: $tipo,
        nacimiento: $nacimiento
      })-[:NACIDO_EN]->(c),
      (p)-[:ASIGNADO_A]->(f)
      RETURN p
      `,
      { nombre, tipo, nacimiento, ciudadNombre, motivoFama }
    );
    return result.records[0].get('p').properties;
  } finally {
    await session.close();
  }
}

module.exports = { getAllPersonajes, createPersonaje };