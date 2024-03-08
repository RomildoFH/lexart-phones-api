const express = require('express');
const router = express.Router();
const ProductController = require('../app/controllers/ProductController');
const TokenValidation = require('../app/middlewares/tokenValidation');

router.get('/:limit/:page', TokenValidation.validateToken, ProductController.getAllProducts);
router.get('/:id', TokenValidation.validateToken, ProductController.getProductById);
router.get('/', TokenValidation.validateToken,ProductController.getAllProducts);
router.post('/', TokenValidation.validateToken, ProductController.create);
router.patch('/:id', TokenValidation.validateToken, ProductController.edit);
router.delete('/:id', TokenValidation.validateToken, ProductController.delete);

module.exports = router;
