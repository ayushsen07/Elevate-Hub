import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';
import routes from './routs';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='mx-auto max-w-screen-3xl'>
     <Toaster position='top-center'/>
    <BrowserRouter>
       <Routes>
       {routes.map((route)=>(<Route key = {route.path} path={route.path} element ={<RouteElement route ={route}/>}/>))}
       </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

const RouteElement = ({route})=>{
  return route.isProtected?(
    <ProtectedRoute>{route.element}</ProtectedRoute>
  ):(
    <>{route.element}</>
  )
}

export default App
