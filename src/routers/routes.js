// src/routers/routes.js
const express = require('express');
const routes = express.Router();
const UserRoutes = require('./UserRoutes.routes');
const ProductRoutes = require('./ProductRoutes.routes');

routes.use('/users', UserRoutes);
routes.use('/products', ProductRoutes);

module.exports = routes;
