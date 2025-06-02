/**
 * Este archivo define funciones para interactuar con la base de datos Neo4j
 * relacionadas con el modelo "Ciudad". Permite obtener todas las ciudades y crear
 * nuevos registros de ciudades asociadas a un país.
 */

const driver = require('../neo4j'); 

/**
 * Obtiene todos los nodos de tipo "Ciudad" de la base de datos.
 * @returns {Promise<Array>} Lista de ciudades.
 */
async function getAllCiudades() {
  const session = driver.session();
  try {
    const result = await session.run(`MATCH (c:Ciudad) RETURN c`);
    return result.records.map(r => r.get('c').properties);
  } finally {
    await session.close();
  }
}

/**
 * Crea un nuevo nodo "Ciudad" y lo asocia a un país existente.
 * @param {Object} data - Datos de la ciudad (nombre, población, latitud, longitud, paisNombre).
 * @returns {Promise<Object>} La ciudad creada.
 */
async function createCiudad(data) {
  const session = driver.session();
  try {
    const { nombre, poblacion, latitud, longitud, paisNombre } = data;
    const result = await session.run(
      `
      MATCH (p:Pais {nombre: $paisNombre})
      CREATE (c:Ciudad {
        nombre: $nombre,
        poblacion: $poblacion,
        latitud: $latitud,
        longitud: $longitud
      })-[:PERTENECE_A]->(p)
      RETURN c
      `,
      { nombre, poblacion, latitud, longitud, paisNombre }
    );
    return result.records[0].get('c').properties;
  } finally {
    await session.close();
  }
}

module.exports = { getAllCiudades, createCiudad };
