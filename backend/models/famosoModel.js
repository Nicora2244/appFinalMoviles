/**
 * Este archivo define funciones para interactuar con la base de datos Neo4j
 * relacionadas con el modelo "Famoso". Permite obtener todos los famosos y crear
 * nuevos registros de famosos asociados a una ciudad.
 */

const { driver } = require('../app');
const session = driver.session();

/**
 * Obtiene todos los nodos de tipo "Famoso" de la base de datos.
 * @returns {Promise<Array>} Lista de famosos.
 */
async function getAllFamosos() {
  const result = await session.run(`MATCH (f:Famoso) RETURN f`);
  return result.records.map(r => r.get('f').properties);
}

/**
 * Crea un nuevo nodo "Famoso" y lo asocia a una ciudad existente.
 * @param {Object} data - Datos del famoso (motivo, ciudadNombre).
 * @returns {Promise<Object>} El famoso creado.
 */
async function createFamoso(data) {
  const { motivo, ciudadNombre } = data;

  const result = await session.run(
    `
    MATCH (c:Ciudad {nombre: $ciudadNombre})
    CREATE (f:Famoso {motivo: $motivo})
    -[:ASIGNADO_A]->(c)
    RETURN f
    `,
    { motivo, ciudadNombre }
  );

  return result.records[0].get('f').properties;
}

module.exports = { getAllFamosos, createFamoso };
