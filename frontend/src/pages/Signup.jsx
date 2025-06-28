import React, { useState } from 'react'
import { useParams, NavLink, Navigate, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import auth from '../apiManager/auth'
import toast from 'react-hot-toast'



function Signup() {

    const {role} = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const heading = role ==='mentor'? 'Sign up as Mentor' : 'Sign up as Student'

    const {register, handleSubmit, reset, formState :{errors}} = useForm() 
    const navigate  = useNavigate()

    const onSubmit=async(data)=>{
        setIsLoading(true)
        
        
        
        const formData = {
            ...data,
            role,
        };
        console.log(formData);
        
        try {
            // api call leter
            const response = await auth.signup(formData)
            console.log('response',response.data.message)
            reset()
            toast.success("Account Created Successfuly")
            navigate("/signin")
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div className="h-screen flex items-center justify-center bg-green-100 px-6">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
       {heading}
      </h2>
     

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* name feild */}
        <div>
          <label className="block text-green-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register('name', {required :"Name is required"})}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {errors.name && (
            <p className='text-red-600'>{errors.name.message}</p>
        )}


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


         {/* username field */}
        <div>
            
          <label className="block text-green-700 font-semibold mb-1">Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            {...register('username', {required :"Username is required", minLength:{
                value:4,message:"Username must be of length 4"
            }})}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {errors.username && (
            <p className='text-red-600'>{errors.username.message}</p>
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
          {isLoading?'Loading...':"Sign Up"}
        </button>
      </form>

      <p className="text-center  mt-4">
        Already have an account?{" "}
         <NavLink className='text-green-700' to="/signin">Sign In</NavLink>
        
      </p>
    </div>
  </div>
  )
}

export default Signup