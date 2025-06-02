/**
 * Este archivo configura y exporta el driver de conexión a la base de datos Neo4j.
 * Se debe importar este driver en los modelos para interactuar con la base de datos.
 */

const neo4j = require('neo4j-driver');

// Configura el driver con la URI y credenciales de Neo4j Aura
const driver = neo4j.driver(
  'neo4j+s://98c27857.databases.neo4j.io',
  neo4j.auth.basic('neo4j', 'fMAvEJZ4Oe78qbf67csQYiygDjL1dD65o-NTLzCgfIc')
);

module.exports = driver;