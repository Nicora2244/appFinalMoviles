/**
 * Este archivo configura y levanta un servidor Express para exponer una API REST.
 * Además, establece la conexión con la base de datos Neo4j y exporta el driver y la sesión.
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const neo4j = require('neo4j-driver');

// Importar las rutas de los modelos
const paisRoutes = require('./routes/paisRoutes');
const ciudadRoutes = require('./routes/ciudadRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS y parsear JSON
app.use(cors());
app.use(bodyParser.json());

// Configuración de las rutas de la API
app.use('/api/paises', paisRoutes);
app.use('/api/ciudades', ciudadRoutes);

// Conexión a la base de datos Neo4j
const driver = neo4j.driver(
  'bolt://localhost:7687',  // Ajustar URL según tu configuración de la nube
  neo4j.auth.basic('neo4j', 'password') 
); 

const session = driver.session();

// Ruta de prueba para verificar que la API funciona
app.get('/', (req, res) => {
  res.send('API de prueba funcionando');
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Exporta el driver y la sesión de Neo4j para usarlos en otros módulos
module.exports = { driver, session };
