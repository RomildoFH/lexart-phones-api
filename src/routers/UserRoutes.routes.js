const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const TokenValidation = require('../app/middlewares/tokenValidation');

router.post('/', UserController.create);
router.post('/admin', TokenValidation.validateToken, UserController.createAdmin);
router.post('/login', UserController.login);
router.get('/', TokenValidation.validateToken, UserController.getAll);
router.get('/:id', TokenValidation.validateToken, UserController.getById);
router.patch('/:id', TokenValidation.validateToken, UserController.update);
router.delete('/:id', TokenValidation.validateToken, UserController.delete);

module.exports = router;
