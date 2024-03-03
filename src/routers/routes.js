// src/routers/routes.js
const express = require('express');
const routes = express.Router();
const UserRoutes = require('./UserRoutes.routes');

routes.use('/users', UserRoutes);

module.exports = routes;
