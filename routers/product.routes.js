const express = require('express');
const router = express.Router();

const {
    addProduct
} = require('../controllers/product.controller')

const {verify} = require('../middleware/authentication')

router.post('/',verify,addProduct)
module.exports = router;