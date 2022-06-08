const db  = require('../models');
const register = async (req,res)=>{
   const data = await db.user_game.create({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });

    res.json({message:"data berhasil di tambahkan",data});
}

module.exports = {register};