const {
    User,
    Role,
    Balance,
    sequelize
} = require('../models/index');

const bcrypt = require('bcrypt');
const {generateToken} = require('../middleware/authentication')

const signUp = async (req,res) => {
    const body = req.body;
    const name = body.name;
    const email = body.email;
    const password = bcrypt.hashSync(body.password, 10);

   await User.findOne({
        where: {
            name: name
        }
    }).then(data => {
        if(data === null){
             User.create({
                name: name,
                email: email,
                password: password,
                role_id: 1
            }).then(data => {
               Balance.create({
                   user_id: data.id,
                   amount: 0
               })

               res.status(200).json({
                    status: "success",
                    message: "sukses menambahkan user"
                })
            })
        }else{
            res.status(400).json({
                status: "fail",
                message: "user already exist"
            })
        }
    }).catch(e => {
        res.status(400).json({
            status: 'fail'
        })
    })
}

const login = async (req,res) => {
    const {email,password} = req.body;

    await User.findOne({
        where: {
            email: email
        },
        attributes: [
            'id',
            'name',
            'email',
            'password',
            [sequelize.literal(`"role"."role"`), "userRole"],
        ],
        subQuery: false,
        include: [{
            model: Role,
            as: 'role',
            attributes: [ ]
        }]
    }).then(data => {
        const passwordValid = bcrypt.compareSync(password, data.password);
        const dataParse = JSON.parse(JSON.stringify(data))
        if(!passwordValid) {                        
            return res.status(401).send({
                message: "Email and Password is not match"
            });
        }

        let dataUser = {
            id: dataParse.id,
            name: dataParse.name,
            role: dataParse.userRole
        }

        let token = generateToken(dataUser)
        console.log(dataParse);

        return res.status(200).json({
            status: "success",
            message: "user berhasil login",
            data:{
                id: dataParse.id,
                name: dataParse.name,
                role: dataParse.userRole
            },
            token: token
        })
    })
}

const topUp = async (req,res) => {
    const {amount} = req.body;

    await Balance.findOne({
        where: {
            user_id: req.id
        }
    }).then(data => {
        let newAmount = data.amount + amount;
        Balance.update({amount: newAmount},{
            where: {
                user_id: req.id
            }
        })

        res.status(200).json({
            status: 'success',
            message: 'berhasil melakukan topUp'
        })
    }).catch(e => {
        res.status(400).json({
            status: 'fail',
            message: 'gagal melakukan topUp'
        })
    })

}


module.exports = {
    signUp,
    login,
    topUp
}