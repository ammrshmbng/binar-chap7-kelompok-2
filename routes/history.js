const router = require('express').Router();

// import controller
const {history} = require('../controllers/history');

router.post('/',history);

module.exports = router;