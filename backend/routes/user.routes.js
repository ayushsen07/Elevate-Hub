const express = require('express')
const userController = require('../contollers/user.controller')
const authMiddleware = require('../midlewares/auth');
const asyncHandler = require('../helper/asyncHandler');
const validate = require('../midlewares/validate');


const router = express.Router();

router.get('/', authMiddleware.protect, asyncHandler(userController.getUser))
router.put('/update-profile', authMiddleware.protect, validate(updateUserProfileValidation), asyncHandler(userController.updateuserProfile))


module.exports = router;
