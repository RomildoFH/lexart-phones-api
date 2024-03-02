const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');

router.post('/', UserController.create);
router.post('/admin', UserController.createAdmin);
router.post('/login', UserController.login);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;
