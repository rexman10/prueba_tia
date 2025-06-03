const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API funcionando con MySQL 🚀'));
// Rutas
app.use('/precio', require('./routes/precio.routes'));
app.use('/promocion', require('./routes/promocion.routes'));
app.use('/producto', require('./routes/producto.routes'));
app.use('/tienda', require('./routes/tienda.routes'));


const PORT = process.env.PORT || 3001;
const startServer = async () => {
  let connected = false;
  let attempts = 0;

  while (!connected && attempts < 5) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexión a MySQL establecida correctamente');
      connected = true;
    } catch (err) {
      attempts++;
      console.log(`❌ Intento ${attempts}: MySQL aún no está disponible. Reintentando en 3s...`);
      await new Promise(res => setTimeout(res, 3000));
    }
  }

  if (!connected) {
    console.error('⛔ No se pudo conectar a la base de datos después de varios intentos.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
  });
};

startServer();

