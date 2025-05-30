/**
 * Este archivo define funciones para interactuar con la base de datos Neo4j
 * relacionadas con el modelo "Tag". Permite obtener todos los tags y crear
 * nuevos registros de tags asociados a un usuario, sitio y personaje.
 */

const { driver } = require('../app');
const session = driver.session();

/**
 * Obtiene todos los nodos de tipo "Tag" de la base de datos.
 * @returns {Promise<Array>} Lista de tags.
 */
async function getAllTags() {
  const result = await session.run(`MATCH (t:Tag) RETURN t`);
  return result.records.map(r => r.get('t').properties);
}

/**
 * Crea un nuevo nodo "Tag" y lo asocia a un usuario, un sitio y un personaje existentes.
 * @param {Object} data - Datos del tag (usuarioMail, sitioNombre, personajeNombre, fechaHora, latitud, longitud).
 * @returns {Promise<Object>} El tag creado.
 */
async function createTag(data) {
  const { usuarioMail, sitioNombre, personajeNombre, fechaHora, latitud, longitud } = data;

  const result = await session.run(
    `
    MATCH (u:Usuario {mail: $usuarioMail}),
          (s:Sitio {nombre: $sitioNombre}),
          (p:Personaje {nombre: $personajeNombre})
    CREATE (t:Tag {
      fechaHora: $fechaHora,
      latitud: $latitud,
      longitud: $longitud
    })
    CREATE (u)-[:REGISTRO_TAG]->(t)
    CREATE (t)-[:EN_SITIO]->(s)
    CREATE (t)-[:CON_PERSONAJE]->(p)
    RETURN t
    `,
    { usuarioMail, sitioNombre, personajeNombre, fechaHora, latitud, longitud }
  );

  return result.records[0].get('t').properties;
}

module.exports = { getAllTags, createTag };