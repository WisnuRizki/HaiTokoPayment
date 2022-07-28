const express = require("express");
const router = express.Router();

const checkout = require("./checkout.routes");
const payment = require('./payment.routes');
const user = require('./user.routes');
const product = require('./product.routes')

router.use("/checkout",checkout)
router.use('/payment',payment);
router.use('/user',user);
router.use('/product',product)

module.exports = router;