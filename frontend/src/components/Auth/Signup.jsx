import React from 'react'
import { useForm } from 'react-hook-form'
import { useState , useEffect } from 'react'
import { Link , useNavigate } from 'react-router-dom'
const Signup = () => {
    const {register , handleSubmit , formState:{ errors } }=useForm()
    
    const [backendError , setBackendError] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
    
    })

    const onsubmit=async (data)=>{
        try{
            const res = await fetch("http://localhost:3001/api/auth/signUp",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({name:data.name , email:data.email , password:data.password , confirmPassword:data.confirmPassword})
            })
            const user = await res.json()
             if (user.success) {
             localStorage.setItem("user" , user.userId)
                setBackendError(user)
                
                setInterval(() => {
                
                navigate("/")
                    
                }, 2000);
               

            }else{
            setBackendError(user)
            }
          
            
        }catch(err){
            console.error("error while posting user data", err);
            
        }
    
        
    }
  return (
    <div className='flex justify-center items-center flex-col'>
             <div className='flex justify-center'>
            <div className='flex max-sm:w-80 max-sm:h-fit  md: w-162 h-190  rounded-2xl  flex-col gap-8 bg-indigo-600 mt-20'>
                <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col justify-top  items-center w-[100%] '>

                    <h1 className='text-4xl mt-8 text-white font-mono'>SignUp</h1>

                    <input type="text"
                    {...register("name" , {required:"Please Enter Name"})}
                    placeholder='Enter Your Name'
                      className='border-b-2 w-[80%] mt-15 max-sm:mt-8 text-gray-400 border-b-neutral-400 focus:outline-none   focus:ring-0 focus:border-white  focus:text-blue-50'
                    />
                    {errors.name && (
                        <span className=' ml-80 max-sm:text-[12px]  text-[14px] text-red-600 max-sm:ml-35 '> {errors.name.message} </span>
                    )}

                    <input type="email"
                        {...register("email", { required: "Please Enter Email!" })}
                        placeholder='Enter Your Email'
                        className='border-b-2 w-[80%] mt-15 max-sm:mt-8 text-gray-400 border-b-neutral-400 focus:outline-none   focus:ring-0 focus:border-white  focus:text-blue-50'
                    />
                    {errors.email && (
                        <span className=' max-sm:ml-35 max-sm:text-[12px] ml-80 text-[14px] text-red-600'> {errors.email.message} </span>
                    )}
                    <input type="password"
                        {...register("password", { required: "Please Enter Password!" })}
                        placeholder='Enter Youe Password'
                        className='border-b-2 w-[80%] mt-15 max-sm:mt-8 text-gray-400 border-b-neutral-400 focus:outline-none   focus:ring-0 focus:border-white  focus:text-blue-50'
                    />
                    {errors.password && (
                        <span className=' max-sm:ml-35 max-sm:text-[12px]  ml-80 text-[14px] text-red-600'> {errors.password.message} </span>
                    )}

                       <input type="password"
                        {...register("confirmPassword", { required: "Please Enter Password!" })}
                        placeholder='Confirm Password'
                        className='border-b-2 w-[80%]  max-sm:mt-8 mt-15 text-gray-400 border-b-neutral-400 focus:outline-none   focus:ring-0 focus:border-white  focus:text-blue-50'
                    />
                    {errors.confirmPassword && (
                        <span className='  max-sm:ml-35 max-sm:text-[12px] ml-80 text-[14px] text-red-600'> {errors.confirmPassword.message} </span>
                    )}
                   
                   
                    
                    <button type='submit' className='btn-primary mt-10 '>Add</button>
           <span className={backendError.success ? 'mt-2 text-emerald-500 font-semibold': "text-red-600  mt-2"}>{backendError.message}</span>

                </form>
            </div>
        </div>
            <span className='text-black' >already have an accout? <Link className='text-violet-500' to={"/login"} >login</Link> {"<"} here </span>

    </div>
  )
}

export default Signup
