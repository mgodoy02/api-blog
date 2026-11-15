// Creación y configuración de la app de Express
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


// Configuración de rutas
// (aquí irá app.use('/api', ...) en el paso 4)

// Manejador 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

module.exports = app;