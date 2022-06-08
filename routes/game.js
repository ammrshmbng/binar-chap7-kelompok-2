const router = require('express').Router();

// import controller
const {game} =require('../controllers/game');

router.post('/',game);

module.exports = router;