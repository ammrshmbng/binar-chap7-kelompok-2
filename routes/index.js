const router = require('express').Router();

// import route
const register = require('../routes/register')


router.use('/register',register);


module.exports= router;