import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Navbar = () => {
    const clearStorege =()=>{
        localStorage.clear("token")
        localStorage.clear("userName")
    }
    const userName = localStorage.getItem("userName")
    return (
        <header className='max-sm:w-[100%] bg-violet-700 text-amber-50 flex justify-around'>
            <h1 className='p-2 text-[22px] font-bold font-mono '><Link to={"/"}>MyTodo!</Link></h1>
            <div className='flex items-center gap-2'>
                <a href="https://www.instagram.com/callme_saad_?utm_source=qr&igsh=ODE2MXIzYjlwemlv" target='_blank'> <FaInstagramSquare className='text-[22px] bg-transparent text-fuchsia-500  transition-transform duration-500 hover:[transform:rotateY(360deg)]' /></a>
                <a href="https://wa.me/qr/RNJNDPS5S5LCH1" target='_blank'> <FaWhatsappSquare className='text-[22px]  bg-transparent text-emerald-400  transition-transform duration-500 hover:[transform:rotateY(360deg)]' /></a>

                {
                    (localStorage.getItem("token") ? (
                    
                        <Link onClick={clearStorege} to={"/login"} className=' w-15 h-7 flex justify-center items-center   bg-indigo-600 hover:text-indigo-800 hover:border-3 hover:border-indigo-600 hover:bg-transparent'>LogOut</Link>
                
                        

                    ) : (
                        <Link to={"/login"} className=' w-15 h-7 flex justify-center items-center   bg-indigo-600 hover:text-indigo-800 hover:border-3 hover:border-indigo-600 hover:bg-transparent'>Login</Link>

                    ))
                }
            </div>

        </header>
    )
}

export default Navbar
