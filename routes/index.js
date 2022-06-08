const router = require('express').Router();

// import route
const register = require('./register');
const login = require('./login');
const room = require('./room');
const game = require('./game')



// routing
router.use('/register',register);
router.use('/login',login);
router.use('/room',room);
router.use('/game',game);


module.exports= router;