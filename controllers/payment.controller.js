const {
    Payment,
    Product,
    Balance,
    Checkout,
    sequelize
} = require('../models/index')

const confirmPayment = async (req,res) => {
    const {
        user_id,
        paymentCode,
        paymentAmount
    } = req.body;

    if(req.role === 'pembeli'){
        let idProduct = [];
        try {
    
            const result = await sequelize.transaction(async (t) => {
        
    
                const findBalance = await Balance.findOne({
                    where: {
                        user_id: req.id
                    },
                    attributes: ['user_id','amount']
                }, { transaction: t })
    
                const findCheckout = await Checkout.findAll({
                    where: {
                        paymentCode: paymentCode
                    },
                    order:
                    [
                        ['id', 'ASC'],
                    ],
                }, { transaction: t })
                
                if(paymentAmount > findBalance.amount){
                    throw new Error
                }
    
                for(let i = 0; i < findCheckout.length; i++){
                    idProduct.push(findCheckout[i].product_id)
                }
    
                const findProduct = await Product.findAll({
                    where: {
                        id: idProduct
                    }
                }, { transaction: t })
    
                //Mengecek jumlah barang dan barang yang dicheckout
                for(let i = 0 ; i < findProduct.length;i++){
                    if(findCheckout[i].totalQuantity > findProduct[i].quantity){
                        throw new Error
                    }else{
    
                        let newQuantity = findProduct[i].quantity - findCheckout[i].totalQuantity;
                        await Product.update({quantity: newQuantity},{
                            where: {
                                id: findCheckout[i].product_id
                            }
                        }, { transaction: t })
                    }
                }
                
                await Payment.update({status: true},{
                    where: {
                        paymentCode: paymentCode
                    }
                }, { transaction: t })
    
                await Checkout.update({status: true},{
                    where: {
                        paymentCode: paymentCode
                    }
                }, { transaction: t })
    
                let newAmount = findBalance.amount - paymentAmount;
                await Balance.update({amount: newAmount},{
                    where: {
                        user_id: req.id
                    }
                },{transaction: t})
                
              
                return res.status(400).json({
                    status: 'Sukses',
                    message: 'Sukses Melakukan Pembayaran'
                })
    
          
            });
          
          } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: 'Gagal',
                message: 'Gagal Melakukan Pembayaran'
            })
          }

    }else{
        return res.status(400).json({
            status: 'Gagal',
            message: 'User Not Auhorized'
        })
    }


    
}

module.exports = {
    confirmPayment
}