const db = require('../models');
let i = 0;
const game = async (req,res)=>{
    try {

        const {pilihanP1,pilihanP2} = req.body;

        // fungsi dapatkan hasil
        function getHasil(player1,player2){
           
            if(player1 == player2) return "DRAW!";
            if(player1 == 'gunting') return (player2 == 'kertas') ? 'YOU WIN!' : 'YOU LOSE!';
            if(player1 == 'kertas') return (player2 == 'gunting') ? 'YOU LOSE!' : 'YOU WIN!';
            if(player1 == 'batu') return (player2 == 'gunting') ? 'YOU WIN!' : 'YOU LOSE!';
                                  return 'salah input';
            
      }

        const  dataRoom = await db.user_game_room.findOne({
            where: {nama_room: req.body.nama_room}            
            
        });

        // check data room jika tidak ada
        if(!dataRoom){
            res.json({message: "room belum di buat",room: "room kosong"})
        }



        // pemrosesan data player 1
       if(pilihanP1){
            
            const pilihanP1Array = await dataRoom.pilihanP1 || [];
            pilihanP1Array.push(pilihanP1);

            const dataRoomPilihan = await db.user_game_room.update({
                pilihanP1:pilihanP1Array
            },{where: {nama_room:req.body.nama_room}});

            // jika player1 menginput lebih dari tiga kali tolak
            if(dataRoom.pilihanP1.length >= 3) res.json({message: "kamu sudah menginput 3"})
            
            res.json(dataRoom);
       }


       //    pemrosesan data player 2
       if(pilihanP2){
           
            // ambil data pilihanP2 dan simpan kedalam variable
            const pilihanP2Array = dataRoom.pilihanP2 || [];
            pilihanP2Array.push(pilihanP2);
            
            // mengisi pilihanP2 --> update
            let dataRoomPilihan = await db.user_game_room.update({
                    pilihanP2:pilihanP2Array
                },{where: {nama_room:req.body.nama_room}

            });


            const dataFight = await db.user_game_history.findOne({
                where : {id_user: req.user.id}
            })

            
            
                // cari data fight

            // jika kosong tulis
            if(!dataFight){
                let hasilP1 =  [];
                let hasilP2 =  [];
                hasilP1.push(getHasil(dataRoom.pilihanP1[i],pilihanP2));
                hasilP2.push(getHasil(pilihanP2,dataRoom.pilihanP1[i]));

                const hasilFight = await db.user_game_history.create({
                    hasilP1: hasilP1,
                    hasilP2: hasilP2,
                    id_user: req.user.id
                })

            }else if(dataFight){
                let hasilP1 = dataFight.hasilP1 ;
                let hasilP2 = dataFight.hasilP2 ;
                hasilP1.push(getHasil(dataRoom.pilihanP1[i],pilihanP2));
                hasilP2.push(getHasil(pilihanP2,dataRoom.pilihanP1[i]));

                const updateFight = await db.user_game_history.update({
                    hasilP1,hasilP1,
                    hasilP2,hasilP2
                },{
                    where : {id_user: req.user.id}
                })
            }

            
            
            
                i++
            // jika player menginput lebih dari tiga kali tolak
            if(dataRoom.pilihanP2.length >= 3) res.json({message: "kamu sudah menginput 3"})
           
            res.json({message:"data berhasil di tambah"})
       }

    
        
    
     

        
        

    } catch (err) {
        res.json({message: "terjadi error",err});
    }

    
}


module.exports ={game}