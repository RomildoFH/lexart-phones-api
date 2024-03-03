const express = require('express');
const router = express.Router();
const ProductController = require('../app/controllers/ProductController');

router.post('/', ProductController.createOne);
// router.post('/admin', UserController.createAdmin);
// router.post('/login', UserController.login);
// router.get('/', UserController.getAll);
// router.get('/:id', UserController.getById);
// router.patch('/:id', UserController.update);
// router.delete('/:id', UserController.delete);

module.exports = router;
