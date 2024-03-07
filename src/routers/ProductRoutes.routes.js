const express = require('express');
const router = express.Router();
const ProductController = require('../app/controllers/ProductController');
const TokenValidation = require('../app/middlewares/tokenValidation');

router.get('/:limit/:page', TokenValidation.validateToken, ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.get('/', TokenValidation.validateToken,ProductController.getAllProducts);
router.post('/', ProductController.create);
router.patch('/:id', ProductController.edit);
router.delete('/:id', ProductController.delete);

module.exports = router;
