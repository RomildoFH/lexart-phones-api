require('dotenv').config();
const server = require('./app');
const port = process.env.SERVER_PORT || 3000; // Default to port 3000 if SERVER_PORT is not set
server.listen(port, () => console.log(`Listening on port: ${port}`));
