/**
 * Este archivo define funciones para interactuar con la base de datos Neo4j
 * relacionadas con el modelo "Sitio". Permite obtener todos los sitios y crear
 * nuevos registros de sitios asociados a una ciudad.
 */

const driver = require('../neo4j'); 

/**
 * Obtiene todos los nodos de tipo "Sitio" de la base de datos.
 * @returns {Promise<Array>} Lista de sitios.
 */
async function getAllSitios() {
  const session = driver.session();
  try {
    const result = await session.run(`MATCH (s:Sitio) RETURN s`);
    return result.records.map(r => r.get('s').properties);
  } finally {
    await session.close();
  }
}

/**
 * Crea un nuevo nodo "Sitio" y lo asocia a una ciudad existente.
 * @param {Object} data - Datos del sitio (nombre, tipo, estilo, latitud, longitud, ciudadNombre).
 * @returns {Promise<Object>} El sitio creado.
 */
async function createSitio(data) {
  const session = driver.session();
  try {
    const { nombre, tipo, estilo, latitud, longitud, ciudadNombre } = data;

    const result = await session.run(
      `
      MATCH (c:Ciudad {nombre: $ciudadNombre})
      CREATE (s:Sitio {
        nombre: $nombre,
        tipo: $tipo,
        estilo: $estilo,
        latitud: $latitud,
        longitud: $longitud
      })-[:UBICADO_EN]->(c)
      RETURN s
      `,
      { nombre, tipo, estilo, latitud, longitud, ciudadNombre }
    );

    return result.records[0].get('s').properties;
  } finally {
    await session.close();
  }
}

module.exports = { getAllSitios, createSitio };