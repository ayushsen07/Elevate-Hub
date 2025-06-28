import React from "react";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Signup from "../pages/Signup";
import Profile from "../pages/dashboard/Profile";
import Services from "../pages/dashboard/services";
import Payment from "../pages/dashboard/Payment";



const routes = [
    { path: "/", element: <Home />, isProtected: false },
    { path: "/signin", element: <SignIn />, isProtected: false },
    { path: "/signup/:role", element: <Signup />, isProtected: false },
    { path: "/dashboard/profile", element: <Profile />, isProtected: true },
    { path: "/dashboard/services", element: <Services />, isProtected: true },
    { path: "/dashboard/payment", element: <Payment />, isProtected: true },

]

export default routes