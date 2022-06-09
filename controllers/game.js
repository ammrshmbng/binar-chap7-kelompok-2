const db = require('../models');

const game = async (req,res)=>{
    try {

        const {pilihanP1,pilihanP2} = req.body;

        const  dataRoom = await db.user_game_room.findOne({
            where: {id: req.body.id}            
            
        });

        // check data room jika tidak ada
        if(!dataRoom){
            res.json({message: "room belum di buat"})
        }

        // main game
        function getPilihanComputer(){
            let comp = Math.random();
            if(comp < 0.34) return 'gunting';
            if(comp >= 0.34 && comp < 0.67) return 'batu';
            return 'kertas'
            
        }
        
        function getHasil(comp,player){
           
              if(player == comp) return "DRAW!";
              if(player == 'gunting') return (comp == 'kertas') ? 'YOU WIN!' : 'YOU LOSE!';
              if(player == 'kertas') return (comp == 'gunting') ? 'YOU LOSE!' : 'YOU WIN!';
              if(player == 'batu') return (comp == 'gunting') ? 'YOU WIN!' : 'YOU LOSE!';
                                    return 'salah input';
              
        }
        
        // menentukan pilihan 
        const pilihanCom = getPilihanComputer();
        let hasil =''


        if(pilihanP1){
            hasil = getHasil(pilihanCom,pilihanP1);
            res.json(hasil);
        }else if(pilihanP2){
            hasil = getHasil(pilihanCom,pilihanP2);
            res.json(hasil);
        }
        
    
        

    } catch (error) {
        
    }
}


module.exports ={game}