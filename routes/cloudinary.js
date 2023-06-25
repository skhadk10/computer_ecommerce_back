const express= require('express')
const router= express.Router()

const { remove, upload } =require('../controllers/cloudinary')
// controllers

// middlewares
const { adminCheck, authCheck }=require( '../middlewares/auth')

router.post('/uploadimages',authCheck,adminCheck,upload)
router.post('/removeimage',authCheck,adminCheck,remove)

module.exports= router