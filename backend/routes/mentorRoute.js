const express = require("express")
const asyncHandler = require("../helper/asyncHandler")
const router = express.Router()
const mentorController = require("../contollers/mentor.controller")



router.get('/', asyncHandler(mentorController.getAllMentors))
router.get('/:username', asyncHandler(mentorController.getMentorByUsername))

module.exports= router