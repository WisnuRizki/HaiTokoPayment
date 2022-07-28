const express = require('express')
const router = express.Router()

const {
   addCheckout,
   getHistory
} = require('../controllers/checkout.controller')

const {verify} = require('../middleware/authentication');

router.post('/',verify,addCheckout);
router.get('/:id',getHistory);

module.exports = router ;