
const db = require('../models');

const room = async (req,res)=>{
    try{

        const dataCheck = await db.user_game_room.findOne({
            where: {id_user: req.body.id_user}
        })

    //    res.json(dataCheck.player2)

        // jika data kosong
        if(!dataCheck){  
                 
            const data= await db.user_game_room.create({
                nama_room: req.body.nama_room,
                player1 : req.body.player1,
                id_user: req.body.id_user
                
            })
            res.json({message:"player1 berhasil buat dan daftar room",data:data})
        }

        // jika player 1 sudah input tampilkan sudah daftar
        if(dataCheck.player1 == req.body.player1){
            res.json({message:"player1 sudah membuat dan mendaftar room"})
        }

    //    jika player dua kosong input data
        if(!dataCheck.player2){
            const data = await db.user_game_room.update({
                player2: req.body.player2
            },{
                where: {id_user: req.body.id_user}
            })

            res.json({message: "player 2 berhasil daftar",data});
        }
        
        if(dataCheck.player2 && dataCheck.player1) res.json({message:"player sudah penuh saatnya fight"})
        

        // const data2 = await db.user_game_room.update({
        //     player2: req.body.player2
            
        // })



      
    
       

    //     //    ambil data room
    //     const dataRoom1 = await db.user_game_room.findOne({
    //         where: {nama_room: req.body.nama_room}
    //     })

        

    // // cek apakah nama room sudah penuh
    //     if(dataRoom1.player1==req.body.player1 && dataRoom1.player2 ==req.body.player2){
    //         res.json({
    //             message: "room sudah penuh"
    //         })
    //     }

    
    //     if(!dataRoom1.player1==req.body.player1){
    //     const data= await db.user_game_room.create({
    //             nama_room: req.body.nama_room,
    //             player1 : req.body.player1,
    //             id_user: req.body.id_user
    //         })
    //         res.json({message: "player1 berhasil daftar room",data:data});
    //     }else if(!dataRoom1.player2){
    //     const data = await db.user_game_room.update({
    //             player2: req.body.player2
    //         },{
    //             where: {player1: req.body.player1}
    //         })

    //         res.json({message: "player2 berhasil daftar",data:data});
    //     }

    }catch(err){
        res.json({message:"data kosong"})

    }
    
    
}

module.exports = {room};

// jika room sudah ada
    