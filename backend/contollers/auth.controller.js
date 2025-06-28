const userService = require('../services/auth.service')
const httpStatus = require('../utils/httpStatus')
const tokenService = require('../services/jwt.service')

const signUp = async (req, res) => {
    const { name, username, email, password, role } = req.body
    const user = await userService.userCreated({
        name,
        email,
        username,
        password,
        role,
    })

    user.password = undefined;

    return res.status(httpStatus.created).json({
        message: 'Account created successfluy',
        user
    })
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password){
        res.status(httpStatus.notFound).json({message :'Email and Password is required'})
    }
    const user = await userService.loginUserWithEmailAndPassword(email,password)
    const token = await tokenService.generateAuthToken(user)
    user.password=undefined
   console.log(`token is ${token}`);
   
    res.status(httpStatus.ok).json({message:"user signed in successfully",token,user})
}

module.exports = { signUp, signIn }