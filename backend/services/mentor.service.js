const userModel = require("../models/user.model")

const getAllMentors = async ()=>{
    return await userModel.find({role:"mentor"})
}

const getMentorById= async (id)=>{
    return await userModel.findById({_id:id})
}

const getMentorByUsername= async (username)=>{
    const mentor = await userModel.findOne({username : username})
    if(!mentor) return null;

    console.log("Mentor found : ", mentor);
    return mentor
}

module.exports = {
    getMentorById,
    getAllMentors,
    getMentorByUsername
}