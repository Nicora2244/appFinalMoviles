/**
 * Este archivo define funciones para interactuar con la base de datos Neo4j
 * relacionadas con el modelo "Usuario". Permite obtener todos los usuarios y crear
 * nuevos registros de usuarios en la base de datos.
 */

const driver = require('../neo4j'); 

/**
 * Obtiene todos los nodos de tipo "Usuario" de la base de datos.
 * @returns {Promise<Array>} Lista de usuarios.
 */
async function getAllUsuarios() {
  const session = driver.session();
  try {
    const result = await session.run(`MATCH (u:Usuario) RETURN u`);
    return result.records.map(r => r.get('u').properties);
  } finally {
    await session.close();
  }
}

/**
 * Crea un nuevo nodo "Usuario" en la base de datos con los datos proporcionados.
 * @param {Object} data - Datos del usuario (mail, password, perfil).
 * @returns {Promise<Object>} El usuario creado.
 */
async function createUsuario(data) {
  const session = driver.session();
  try {
    const { mail, password, perfil } = data;

    const result = await session.run(
      `
      CREATE (u:Usuario {
        mail: $mail,
        password: $password,
        perfil: $perfil
      })
      RETURN u
      `,
      { mail, password, perfil }
    );

    return result.records[0].get('u').properties;
  } finally {
    await session.close();
  }
}

module.exports = { getAllUsuarios, createUsuario };