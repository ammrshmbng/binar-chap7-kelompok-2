// import jwt config
const jwtConfig = require('../config/jwt');

const jwt = require('jsonwebtoken');

const db = require('../models');

const login = async (req,res)=>{
    const data = await db.user_game.findOne({
        where : {username: req.body.username}
    });

    if(!data.username==req.body.nama && data.password== req.body.password){
        res.json({messase:"nama atau password mungkin salah"});
    }

    const tokenPayload = {
        id: data.id,
        nama : data.nama,
        role: data.role
    }

    const token = jwt.sign(tokenPayload,jwtConfig.JWT_SECRET);

    res.json({
        message:"token berhasil",
        token: token
    })
}

module.exports = {login};
