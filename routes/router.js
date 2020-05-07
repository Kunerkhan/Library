const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.post('/addUser', userController.addUser);

router.post('/login', userController.login);

router.post('/deleteUser/:id', userController.deleteUser);

router.get('/users', userController.getUsers);

router.get('/library', )

module.exports = router;