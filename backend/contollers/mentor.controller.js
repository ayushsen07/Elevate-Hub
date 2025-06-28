const httpStatus = require("../utils/httpStatus")
const mentorService = require("../services/mentor.service")
const ApiError = require('../helper/apiError')

const getAllMentors = async (req, res, next) => {
    const mentors = await mentorService.getAllMentors();
    if (!mentors) {
        return next(new ApiError(httpStatus.notFound, "mentor not found"))
    }
    res.status(httpStatus.ok).json({
         success: true,
          mentors
     })
}


const getMentorByUsername = async (req, res, next) => {
    const { username } = req.params
    if (!username) res.status(httpStatus.notFound).json({
         message: "username is required" })
    const mentor = await mentorService.getMentorByUsername(username);
    if (!mentor) {
        return next(new ApiError(httpStatus.notFound, "NO nay mentor found by this username"))
    }
    res.status(httpStatus.ok).json({ 
        success: true,
         mentor
    })
}


module.exports = {
    getAllMentors,
    getMentorByUsername
}