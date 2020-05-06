const express = require('express');
const router = express.Router();

const users = require('../controllers/UserController');

router.post('/login', users.findOne);

router.get('/users', users.findAll);

module.exports = router;