import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HeroSections from './components/HeroSections.jsx'
import Login from './components/Auth/login.jsx'
import Signup from './components/Auth/Signup.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'


function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<> <Navbar/><HeroSections/> </>
    },
    {path:"/login"
      ,element:<> <Navbar/><Login/> </>
    },
    {
      path:"/signup",
      element:<> <Navbar/><Signup/> </>
    }

  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
