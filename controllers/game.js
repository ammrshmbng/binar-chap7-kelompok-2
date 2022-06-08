const db = require('../models');

const game = async (req,res)=>{
    try {
        const  dataRoom = await db.user_game_room.findOne({
            where: {id: req.body.id}
            
            
        });
        

    } catch (error) {
        
    }
}


module.exports ={game}