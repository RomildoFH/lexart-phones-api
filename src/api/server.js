require('dotenv').config();
const server = require('./app');
const port = process.env.SERVER_PORT;
server.listen(port, () => console.log(`Ouvindo na porta: ${port}`));