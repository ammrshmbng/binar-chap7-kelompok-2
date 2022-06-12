const db = require('../models');

const history = async (req,res)=>{
   
   try {
    const getDataHistoryAll = await db.user_game_history.findAll();
    res.json(getDataHistoryAll);


   } catch (error) {

   }
}


module.exports = {history}