import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useUserStore from '../store/user'
import { useForm } from 'react-hook-form'
import auth from '../apiManager/auth'
import { setToken } from '../helper'
import toast from 'react-hot-toast'

function SignIn() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {setUser} = useUserStore()

 const {register, handleSubmit, reset, formState :{errors}} = useForm()
  const onSubmit= handleSubmit(async(data)=>{
  setIsLoading(true);

  const loginFormData = {...data}
  console.log(loginFormData);
  

   
  try {
    const response = await auth.signin(data)
    reset()
    setUser(response?.data?.user)
    setToken(response.data.token)
    navigate('/')
    toast.success("Login successful!")

    
  } catch (error) {
    console.log(error);
    toast.error("Login failed please check your credentials")
    
  }
  setIsLoading(false)
  })
  return ( 
    <>
     <div className="h-screen flex items-center justify-center bg-green-100 px-6">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-4xl font-bold text-green-800 text-center mb-6">
       Welcome Back
      </h2>
      
     

      <form onSubmit={onSubmit} className="space-y-4">


        {/* email feild */}
        <div>
          <label className="block text-green-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email', {required :"Email is required", pattern :{value:/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/i, message:"Invalid email address"}})}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {errors.email && (
            <p className='text-red-600'>{errors.email.message}</p>
        )}



        {/* password field */}
        <div>
          <label className="block text-green-700 font-semibold mb-1">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            {...register('password', {required :"password is required", minLength:{
                value:6, message:"Password must be atleast 6 characters long"
            }})}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {errors.password && (
            <p className='text-red-600'>{errors.password.message}</p>
        )}



         {/* submit button */}
        <button disabled={isLoading} className="w-full bg-green-700 hover:bg-green-900 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 cursor-pointer">
          {isLoading?'Loading...':"Sign In"}
        </button>
      </form>

      <p className="text-center  mt-4">
        Don't have an account yet?{" "}
         <NavLink className='text-green-700 font-semibold' to="/signup/student">Sign Up</NavLink>
      </p>
      <p className="text-center  mt-4">
        Become a {" "} <NavLink className='text-green-700 font-semibold' to="/signup/mentor">Mentor</NavLink>{" "} with us
      </p>
    </div>
  </div>
    </>
  )
}

export default SignIn