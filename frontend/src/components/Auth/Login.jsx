import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
    const [backendErrors, setBackEndError]= useState([])
    const { register, reset, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const onSubmit = async (data) => { 
        try{
            const res = await fetch("http://localhost:3001/api/auth/logIn",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email:data.email , password:data.password , userId:data.userId})
            })
            const user =await res.json()
       
            
           const userId = localStorage.setItem("user", user.userId)
            

            if (user.success &&  localStorage.getItem("user")) {
                setBackEndError(user)
                setInterval(() => {
                
                navigate("/")
                    
                }, 2000);
               

            }else{
                setBackEndError(user)
                navigate("/login")
            }
            
            
        }catch(err){
            console.error("error while sending user signup req", err);

        }
    }

    return (
        <div className='flex justify-center items-center flex-col'>
            <div className='flex max-sm:w-80 max-sm:h-fit  md: w-162 h-190  rounded-2xl  flex-col gap-8 bg-indigo-600 mt-20 '>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-top  items-center w-[100%] '>

                    <h1 className='text-4xl mt-8 text-white font-mono'>LogIN</h1>

                    <input type="email"
                        {...register("email", { required: "Please Enter Email!" })}
                        placeholder='Enter Your Email'
                        className='border-b-2 w-[80%] mt-15 max-sm:mt-8 text-gray-400 border-b-neutral-400 focus:outline-none   focus:ring-0 focus:border-white  focus:text-blue-50'
                    />
                    {errors.email && (
                        <span className='ml-75 max-sm:text-[12px] max-sm:ml-45 max-sm:mt-2 text-red-600'>{errors.email.message}</span>
                    )}
                    <input type="password"
                        {...register("password", { required: "Please Enter Password!" })}
                        placeholder='Enter Youe Password'
                        className='border-b-2 w-[80%] mt-15 max-sm:mt-8 text-gray-400 border-b-neutral-400 focus:outline-none   focus:ring-0 focus:border-white  focus:text-blue-50'
                    />
                    {errors.password && (
                        <span className='ml-75  max-sm:text-[12px] max-sm:ml-45 max-sm:mt-2 text-red-600'> {errors.password.message} </span>
                    )}
                    <button type='submit' className='btn-primary mt-10 max-sm:mb-2'>Add</button>
                    <span className={backendErrors.success ? 'mt-2 text-emerald-500 font-semibold': "text-red-600  mt-2"}>{backendErrors.message}</span>
                      
                </form>
              
            </div>
            <span className='text-black' >Don't have an accout? <Link className='text-violet-500' to={"/signup"} >signUP</Link> {"<"} here </span>
            
        </div>
    )
}

export default Login
