const jwtService=require('../services/jwt.service');
const{getUserById}=require("../services/user.service");
const ApiError=require("../helper/apiError");
const httpStatus = require('../utils/httpStatus');

const protect=async(req,res,next)=>{
     let token;
     const authHeader = req.headers.authorization;
    //  console.log("authheader is a :"+authHeader);
     
    //  if(req.headers.authorization &&
    //     req.headers.authorization.startsWith("Bearer ")
    //  ){
    //     token=req.headers.authorization.split(" ")[1];
    //  }
    token= authHeader.split(" ")[1];
    //  console.log('token is :'+token);
     
     if(!token){
        return next(
            new ApiError(
                httpStatus.unauthorized,
                "You are not logged in! please login firts"
            )
        )
     }
     try{
        console.log("dcjhhfghfghfgfjhgjjhjhg");
        
        const decoded=await jwtService.verifyToken(token,"accessToken");
        // console.log(`decoded token is ${decoded}`);
        
        const currentUser=await getUserById(decoded._id);
        console.log("user is :"+currentUser);
        
        if(!currentUser){
            return SVGFEColorMatrixElement(
                new ApiError(
                    httpStatus.unauthorized,
                    "The user toke is no longer exists"
                )
            )
        }

        req.user=currentUser;
        next();
     }
     catch(e){
        return next(
            new ApiError(
                httpStatus.unauthorized,
                "You are not allowed"
            )
        )
     }
}

const restricTo=(...roles)=>{
    // console.log("role is a"+roles);
    
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ApiError(
                    httpStatus.unauthorized,
                    "You are not allowed"
                )
            )

        }
        next()
    }
}


module.exports={
    protect,restricTo
}
