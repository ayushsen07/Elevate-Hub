const userModel = require('../models/user.model')
const ApiError = require("../helper/apiError")
const httpsStatus = require("../utils/httpStatus")

const userCreated= async (data)=>{
    return userModel.create(data);
}

const loginUserWithEmailAndPassword = async (email,password)=>{
    const user =await userModel.findOne({email}).select("+password")
    if(!user || !(await user.isPasswordMatch(password))){
        throw new ApiError(httpsStatus.unauthorized, "Incorrect email or password")
    }
    return user;
}

module.exports={userCreated,
    loginUserWithEmailAndPassword
}