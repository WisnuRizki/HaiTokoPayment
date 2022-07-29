const {
	Checkout,
    Payment,
    Product,
    sequelize
} = require("../models/index");
const {nanoid} = require('nanoid');

const addCheckout = async (req,res) => {
    const {data} = req.body;
    let idProduct = [];
    let grandTotal = 0;
    const paymentCode = nanoid(16)
   
    if(req.role === 'pembeli'){
        for(let i = 0 ;i < data.length;i++){
            idProduct.push(data[i].product_id)
        }
    
        try {
    
            const result = await sequelize.transaction(async (t) => {
            
                const findProduct = await Product.findAll({
                    where: {
                        id: idProduct
                    },
                    order:
                    [
                        ['id', 'ASC'],
                    ],
                }, { transaction: t })

               const dataBody = JSON.parse(JSON.stringify(data))
               const infoProduct = JSON.parse(JSON.stringify(findProduct))
               
               const createCheckout = await dataBody.map((item,index) => {
                   Checkout.create({
                       user_id: req.id,
                       paymentCode: paymentCode,
                       product_id: item.product_id,
                       totalQuantity: item.totalQuantity,
                       totalPrice: infoProduct[index].price * item.totalQuantity,
                       status: false
                   },{ transaction: t })
                   grandTotal += (infoProduct[index].price * item.totalQuantity)
               })
    
               const createPayment = await Payment.create({
                   user_id: req.id,
                   paymentCode: paymentCode,
                   grandTotal:grandTotal,
                   status: false
               },{ transaction: t })
               
               
                return res.status(400).json({
                    status: 'Sukses',
                    message: 'Sukses Menambahkan Checkout',
                    paymentCode: paymentCode
                })
    
          
            });
          
          } catch (error) {
            return res.status(400).json({
                status: 'Gagal',
                message: 'Gagal menambahkan User'
            })
          }

    }else{
        return res.status(400).json({
            status: 'Gagal',
            message: 'User Not Authorized'
        })
    }

}

const getHistory = async (req,res) => {
    const {id} = req.params;

    await Checkout.findAll({
        where: {
            user_id: id,
            status: true
        },
        attributes: [
            'id',
            'user_id',
            'paymentCode',
            [sequelize.literal(`"product"."name"`), "productName"],
            "totalQuantity",
            'totalPrice',
            'status'
        ],
        subQuery: false,
        include: [{
            model: Product,
            as: 'product',
            attributes: []
        }]
    }).then(data => {
        res.status(200).json({
            status: 'success',
            data: data
        })
    }).catch(e => {
        res.status(400).json({
            status: 'fail',
            message: 'gagal mengambil data history'
        })
    })
}

module.exports = {
	addCheckout,
    getHistory
};