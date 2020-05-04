const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => res.render('index'));

router.get('/login', (req, res) => res.render('loginView'));

router.get('/users', (req, res) => res.render('users'));

module.exports = router;