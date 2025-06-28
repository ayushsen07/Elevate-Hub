import React, { Children } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

// function ProtectedRoute() {

//     const isAuthenticated = localStorage.getItem("token")
//     // console.log("tooken is : ", isAuthenticated);

//   return isAuthenticated?Children : <Navigate to="/signin"/>
// }

// export default ProtectedRoute


// import React from 'react'
import useUserStore from '../store/user';

function ProtectedRoute(props) {

  const {children} = props;
  const {user}=useUserStore();
  const location  = useLocation();

  if(!user){
    return <Navigate to={`/signin?redirect=${location.pathname}`}/>
  }

  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute