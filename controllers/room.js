
const db = require('../models');

const room = async (req,res)=>{
    try{

       

        const dataCheck = await db.user_game_room.findOne({
            where: {nama_room: req.body.nama_room}
        })

    //    res.json(dataCheck.player2)

        // jika data kosong
        if(!dataCheck){  
                 
            const data= await db.user_game_room.create({
                nama_room: req.body.nama_room,
                player1 : req.body.player1,
                idP1: req.user.id,
                id_user: req.user.id
                
            })
            res.json({message:"player1 berhasil buat dan daftar room",})
        }

        // jika player 1 sudah input tampilkan sudah daftar
        if(dataCheck.idP1 == req.user.id){
            res.json({message:"player1 sudah membuat dan mendaftar room"})
        }

    //    jika player dua kosong input data
        if(!dataCheck.player2){
            const data = await db.user_game_room.update({
                idP2: req.user.id
            },{
                where: {nama_room: req.body.nama_room}
            })

            res.json({message: "player 2 berhasil daftar",data});
        }
        
        if(dataCheck.player2 && dataCheck.player1) res.json({message:"player sudah penuh saatnya fight"})
        


    }catch(err){
        
        res.json({message:"data kosong"})

    }
    
    
}

module.exports = {room};

// jika room sudah ada
    