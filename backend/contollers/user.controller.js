const userService = require('../services/user.service');
const httpStatus = require('../utils/httpStatus')





const getUser= async(req,res,next)=>{
    const userId=req.user._id;
    const user = await userService.getUserById(userId);

    if(!user){
        return  next(new ApiError(httpStatus.notFound, 'user nopt found'))
    }

    res.status(httpStatus.ok).json({
        success : true,
        messsage:"user found",
        user,
    })
}


const updateuserProfile= async (req,res,next) =>{
    const userId = req.user._id;
    const profileData= req.body;

    if(!profileData){
        return next(new ApiError (httpStatus.notFound, 'Profile data is required'))
    }

    const updatedUser = await userService.updateUserProfile(userId,profileData);
    
    if (!updatedUser) {
        return next(new ApiError(httpStatus.notFound, "User not found"));
      }


      res.status(httpStatus.ok).json({
        success:true,
        message:"Profile updated successfully",
        user:updatedUser
      });


      module.exports={
        getUser,
        updateuserProfile

      }
    
}