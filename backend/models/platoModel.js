/**
 * Este archivo define funciones para interactuar con la base de datos Neo4j
 * relacionadas con el modelo "Plato". Permite obtener todos los platos y crear
 * nuevos registros de platos asociados a una ciudad.
 */

const driver = require('../neo4j'); 

/**
 * Obtiene todos los nodos de tipo "Plato" de la base de datos.
 * @returns {Promise<Array>} Lista de platos.
 */
async function getAllPlatos() {
  const session = driver.session();
  try {
    const result = await session.run(`MATCH (p:Plato) RETURN p`);
    return result.records.map(r => r.get('p').properties);
  } finally {
    await session.close();
  }
}

/**
 * Crea un nuevo nodo "Plato" y lo asocia a una ciudad existente.
 * @param {Object} data - Datos del plato (nombre, cocina, ciudadNombre).
 * @returns {Promise<Object>} El plato creado.
 */
async function createPlato(data) {
  const session = driver.session();
  try {
    const { nombre, cocina, ciudadNombre } = data;
    const result = await session.run(
      `
      MATCH (c:Ciudad {nombre: $ciudadNombre})
      CREATE (p:Plato {
        nombre: $nombre,
        cocina: $cocina
      })-[:COMIDA_TIPICA_DE]->(c)
      RETURN p
      `,
      { nombre, cocina, ciudadNombre }
    );
    return result.records[0].get('p').properties;
  } finally {
    await session.close();
  }
}

module.exports = { getAllPlatos, createPlato };
