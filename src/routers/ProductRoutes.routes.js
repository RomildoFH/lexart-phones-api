const express = require('express');
const router = express.Router();
const ProductController = require('../app/controllers/ProductController');

router.post('/', ProductController.createOne);
router.post('/many', ProductController.createMany);
router.get('/:limit/:page', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.get('/', ProductController.getAllProducts);
// router.patch('/:id', ProductController.update);
// router.delete('/:id', UserController.delete);

module.exports = router;
