const express = require('express');
const router = express.Router();
var cors = require('cors');

const userController = require('../controllers/UserController');
const libraryController = require('../controllers/LibraryController');
const rolesController = require('../controllers/RolesController');

router.post('/addUser', userController.addUser);

router.post('/login', userController.login);

router.post('/deleteUser/:id', userController.deleteUser);

router.post('/editUser/:id', userController.editUser);

router.post('/addBook', userController.addBook);

router.get('/users', userController.getUsers);

router.get('/user/:id', userController.getUserById);

router.get('/roles', rolesController.getRoles);

router.get('/userbook/:id', userController.getUserBooks);

router.get('/library', libraryController.getAllbooks);

router.get('/searchbook', userController.search);

module.exports = router;