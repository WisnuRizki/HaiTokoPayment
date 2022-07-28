const {
    Product
} = require('../models/index');

const addProduct = async (req,res) => {
    const {
        name,
        quantity,
        price
    } = req.body;
    
    if(req.role === 'penjual'){
        await Product.create({
            name: name,
            quantity: quantity,
            price: price
        }).then(data => {
            res.status(200).json({
                status: 'success',
                message: 'berhasil menambahkan product'
            })
        }).catch(e => {
            res.status(400).json({
                status: 'fail',
                message: 'gagal menambahkan produt'
            })
        })
    }else{
        res.status(400).json({
            status: 'fail',
            message: 'user not authorized'
        })
    }
}

module.exports = {
    addProduct
}