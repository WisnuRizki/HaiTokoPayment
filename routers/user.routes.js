const express = require('express');
const router = express.Router()

const {
    signUp,
    login,
    topUp
} = require('../controllers/user.controller');

const {verify} = require('../middleware/authentication');

router.post('/signUp',signUp);
router.post('/login',login);
router.put('/topUp',verify,topUp)

module.exports = router;