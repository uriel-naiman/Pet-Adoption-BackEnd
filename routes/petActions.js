const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validate } = require('../middlewares/validation');

const router = express.Router();

// for logged in users
router.post('/:petId/adopt', (req, res, next) =>{

});

// for logged in users
router.post('/:petId/return', (req, res, next) =>{

});

// for logged in users
router.post('/:petId/save', (req, res, next) =>{

});

// for logged in users
router.delete('/:petId/save', (req, res, next) =>{

});


module.exports = router;