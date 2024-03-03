require('dotenv').config();
const Database = require('../database/index')
const server = require('./app');
const port = process.env.SERVER_PORT || 3000; // Default to port 3000 if SERVER_PORT is not set

// Inicializar o Database antes de iniciar o servidor
(async () => {
  try {
    await new Database().init();
    server.listen(port, () => console.log(`Listening on port: ${port}`));
  } catch (error) {
    console.error('Erro ao iniciar o banco de dados:', error);
  }
})();
