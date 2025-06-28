const express= require('express')
const validate=require('../midlewares/validate')

const authController=require('../contollers/auth.controller')
const asyncHandler = require('../helper/asyncHandler')
const {signInValidation,signUpValidation} = require('../validation/auth.validation')




const router = express.Router()


router.post('/signup', validate(signUpValidation), asyncHandler(authController.signUp))
router.post('/signin', validate(signInValidation), asyncHandler(authController.signIn))


module.exports=router 