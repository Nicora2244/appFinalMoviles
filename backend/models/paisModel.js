/**
 * Este archivo define funciones para interactuar con la base de datos Neo4j
 * relacionadas con el modelo "Pais". Permite obtener todos los países y crear
 * nuevos registros de países en la base de datos.
 */

const driver = require('../neo4j'); 

/**
 * Obtiene todos los nodos de tipo "Pais" de la base de datos.
 * @returns {Promise<Array>} Lista de países.
 */
async function getAllPaises() {
  const session = driver.session();
  try {
    const result = await session.run(`MATCH (p:Pais) RETURN p`);
    return result.records.map(r => r.get('p').properties);
  } finally {
    await session.close();
  }
}

/**
 * Crea un nuevo nodo "Pais" en la base de datos con los datos proporcionados.
 * @param {Object} data - Datos del país (nombre, población, continente).
 * @returns {Promise<Object>} El país creado.
 */
async function createPais(data) {
  const session = driver.session();
  try {
    const { nombre, poblacion, continente } = data;
    const result = await session.run(
      `CREATE (p:Pais {nombre: $nombre, poblacion: $poblacion, continente: $continente}) RETURN p`,
      { nombre, poblacion, continente }
    );
    return result.records[0].get('p').properties;
  } finally {
    await session.close();
  }
}

module.exports = { getAllPaises, createPais };
