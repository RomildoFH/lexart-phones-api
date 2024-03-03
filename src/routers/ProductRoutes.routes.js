const express = require('express');
const router = express.Router();
const ProductController = require('../app/controllers/ProductController');

router.get('/:limit/:page', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.create);
router.patch('/:id', ProductController.edit);
router.delete('/:id', ProductController.delete);

module.exports = router;
