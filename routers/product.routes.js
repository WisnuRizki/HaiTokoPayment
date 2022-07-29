const express = require('express');
const router = express.Router();

const {
    addProduct,
    allProduct
} = require('../controllers/product.controller')

const {verify} = require('../middleware/authentication')

router.post('/',verify,addProduct)
router.get('/',allProduct)
module.exports = router;