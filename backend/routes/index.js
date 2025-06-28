const express = require('express')
const router = express.Router();
const authRoute = require('./auth.routes')
const homeRoute=require('./homeRoute')
const mentorRoute = require('./mentorRoute')
const serviceRoute = require('./serviceRoute')

const Routes =[
    {
        path:'/',
        route:homeRoute
    },
    {
        path:'/auth',
        route:authRoute
    },
    {
        path:'/mentor',
        route:mentorRoute
    },
    {
        path:'/service',
        route:serviceRoute
    },

    
];

Routes.forEach((route)=>{
    router.use(route.path,route.route)
})

module.exports=router