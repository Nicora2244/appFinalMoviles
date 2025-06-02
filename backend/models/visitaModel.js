/**
 * Este archivo define funciones para interactuar con la base de datos Neo4j
 * relacionadas con el modelo "Visita". Permite obtener todas las visitas y crear
 * nuevos registros de visitas asociadas a un usuario y un sitio.
 */

const driver = require('../neo4j'); 

/**
 * Obtiene todos los nodos de tipo "Visita" de la base de datos.
 * @returns {Promise<Array>} Lista de visitas.
 */
async function getAllVisitas() {
  const session = driver.session();
  try {
    const result = await session.run(`MATCH (v:Visita) RETURN v`);
    return result.records.map(r => r.get('v').properties);
  } finally {
    await session.close();
  }
}

/**
 * Crea un nuevo nodo "Visita" y lo asocia a un usuario y un sitio existentes.
 * @param {Object} data - Datos de la visita (usuarioMail, sitioNombre, fechaHora).
 * @returns {Promise<Object>} La visita creada.
 */
async function createVisita(data) {
  const session = driver.session();
  try {
    const { usuarioMail, sitioNombre, fechaHora } = data;

    const result = await session.run(
      `
      MATCH (u:Usuario {mail: $usuarioMail}), (s:Sitio {nombre: $sitioNombre})
      CREATE (v:Visita {fechaHora: $fechaHora})
      CREATE (u)-[:REALIZO_VISITA]->(v)
      CREATE (v)-[:EN_SITIO]->(s)
      RETURN v
      `,
      { usuarioMail, sitioNombre, fechaHora }
    );

    return result.records[0].get('v').properties;
  } finally {
    await session.close();
  }
}

module.exports = { getAllVisitas, createVisita };