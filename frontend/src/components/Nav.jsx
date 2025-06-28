import React, { useState } from 'react'
import { useNavigate, NavLink,  } from 'react-router-dom'
import useUserStore from '../store/user'
import {Dropdown, Menu} from 'antd'
import { removeToken } from '../helper'

function Nav() {
  const {user,setUser}=useUserStore()
  const navigate = useNavigate()
  const signupMentorBtnClick = ()=>navigate('/signup/mentor')
  const signupStudentBtnClick = ()=>navigate('/signup/student')
  const signInBtnClick = ()=>navigate('/signin')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const onLogoutBtnClick=()=>{
    removeToken();
    setUser(null);
    navigate('/')
  }
  const menu=(
    <Menu>
      {/* dashboard menu button */}
      <Menu.Item>
        <NavLink to='/dashboard/profile'>
          DashBoard
        </NavLink>
      </Menu.Item>

      {/* logout manu button */}
      <Menu.Item>
        <button onClick={onLogoutBtnClick}>
          Logout
        </button>
      </Menu.Item>
    </Menu>
  )
  return (
    <>
      <div className='bg-white w-full h-[80px]'>
        <div className='flex h-full justify-between mx-16 items-center'>
          <div>
            <NavLink to='/'>
              <span className='text-2xl font-bold text-green-700'>Elevate Hub</span>
            </NavLink>

          </div>

          {/* mobile menu button */}
          {!user && (
            <div className='lg:hidden'>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className='text-2xl'>&#9776;</span>
            </button>
          </div>
          )}


          {/* desktop navigation (visible only when user is not logged in) */}
          {/* <div className='flex'> */}
           {!user ? (
             <ul className=' hidden lg:flex space-x-10'>
             <li>
               <button onClick={signupMentorBtnClick} className='  font-medium bg-green-600 py-2 px-5 rounded-sm cursor-pointer'>Become a Mentor with us</button>
             </li>
             <li>
               <button className=' font-medium
                text-green-700 py-2 px-5 rounded-sm cursor-pointer'
                onClick={signInBtnClick}>Sign In</button>
             </li>
             <li>
               <button onClick={signupStudentBtnClick} className=' font-medium text-white bg-green-600 py-2 px-5 rounded-sm cursor-pointer'>Sign Up</button>
             </li>
           </ul>
           ):
           (
             <Dropdown overlay={menu} trigger={["click"]}>
              <button>
                {user.name.charAt(0).toUpperCase()}
              </button>

             </Dropdown>
           )
           }
          


          {/* Mobile menu (visible when isMobileMenuOpen is true) */}
          {!user && isMobileMenuOpen && (
            <div className="absolute top-[80px] left-0 w-full bg-white shadow-md flex flex-col items-center py-5 space-y-4 lg:hidden">
              <button className="bg-green-600 py-2 px-5 rounded-sm cursor-pointer">
                Become a Mentor with us
              </button>
              <button className="font-semibold text-green-700 py-2 px-5 rounded-sm cursor-pointer">
                Sign In
              </button>
              <button className="bg-green-600 py-2 px-5 rounded-sm cursor-pointer">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Nav