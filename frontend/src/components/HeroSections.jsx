import React from 'react'
import TodoForm from './TodoForm'

const HeroSections = () => {
  const userName = localStorage.getItem("userName")
  return (
    <div className=' h-[100%] flex flex-col items-center '>
    {!userName ? (""):(<div className='w-[100%] mt-2'>
  <h1 className=' text-white p-2 text-center max-sm:text-[16px] max-sm:mt-2  bg-purple-500' >Welcome {userName}! <br /> thank you for using our service!</h1>
</div>)
}
              <TodoForm/>
    </div>
  )
}

export default HeroSections
