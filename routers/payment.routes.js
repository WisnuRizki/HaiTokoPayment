const express = require('express');
const router = express.Router();

const {
    confirmPayment
} = require('../controllers/payment.controller');

const {verify} = require('../middleware/authentication');

router.post('/',verify,confirmPayment);

module.exports = router;