/**
 * Este archivo configura y levanta un servidor Express para exponer una API REST.
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar las rutas de los modelos
const paisRoutes = require('./routes/paisRoutes');
const ciudadRoutes = require('./routes/ciudadRoutes');
const sitioRoutes = require('./routes/sitioRoutes');
const platoRoutes = require('./routes/platoRoutes');
const famosoRoutes = require('./routes/famosoRoutes');
const personajeRoutes = require('./routes/personajeRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const visitaRoutes = require('./routes/visitaRoutes');
const tagRoutes = require('./routes/tagRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS y parsear JSON
app.use(cors());
app.use(bodyParser.json());

// Configuración de las rutas de la API
app.use('/api/paises', paisRoutes);
app.use('/api/ciudades', ciudadRoutes);
app.use('/api/sitios', sitioRoutes);
app.use('/api/platos', platoRoutes);
app.use('/api/famosos', famosoRoutes);
app.use('/api/personajes', personajeRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/visitas', visitaRoutes);
app.use('/api/tags', tagRoutes);

// Ruta de prueba para verificar que la API funciona
app.get('/', (req, res) => {
  res.send('API de prueba funcionando');
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});