const express = require('express');
const router = express.Router()

// controller
const { create,remove,update,read,list } = require('../controllers/sub');
// middleware
const { authCheck,adminCheck } = require('../middlewares/auth');


// route
router.post('/sub',authCheck,adminCheck,create)
router.get('/subs',list)
router.get('/sub/:slug',read)
router.put('/sub/:slug',authCheck,adminCheck,update)
router.delete('/sub/:slug',authCheck,adminCheck,remove)

module.exports = router