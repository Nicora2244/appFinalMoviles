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
 * Crea un nuevo nodo "Plato" y lo asocia a un sitio existente, incluyendo el precio.
 * @param {Object} data - Datos del plato (nombre, cocina, sitioNombre, precio).
 * @returns {Promise<Object>} El plato creado.
 */
async function createPlato(data) {
  const session = driver.session();
  try {
    const { nombre, cocina, sitioNombre, precio } = data;
    const result = await session.run(
      `
      MATCH (s:Sitio {nombre: $sitioNombre})
      CREATE (p:Plato {
        nombre: $nombre,
        cocina: $cocina,
        precio: $precio
      })
      CREATE (p)-[:SE_CONSIGUE_EN]->(s)
      RETURN p
      `,
      { nombre, cocina, sitioNombre, precio }
    );
    return result.records[0].get('p').properties;
  } finally {
    await session.close();
  }
}

module.exports = { getAllPlatos, createPlato };
