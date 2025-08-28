import React from 'react'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router';

const TodoForm = () => {
    const [todos, setTodos] = useState([])
    const { register, reset, handleSubmit, formState: { errors } } = useForm()
    const [editingId, setEditingId] = useState(null)
    const [editingText, setEditingText] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const userId= localStorage.getItem("user")
                const res = await fetch("http://localhost:3001/api/todos",{
                    method:"GET",
                    headers:{"Content-Type":"application/json",
                          "x-user-id": userId // 
                    },

                })
                const data = await res.json()
                setTodos(data.todo)
                console.log(data.todo);
                


            } catch (err) {
                console.error("error while fetching todos ", err);

            }
        }
        fetchTodos()
    },[])

    const onSubmit = async (data) => {
        try {
             const user = localStorage.getItem("user")
             if (!user) {
                return navigate("/login")
             }
              console.log(user);
            const res = await fetch('http://localhost:3001/api/todos', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: data.todo ,userId:user })
            })


            const newTodo = await res.json()
           
           
            
            
            setTodos([...todos, { text: newTodo.todo.text, completed: false  }])
            console.log();
            

            reset()
        } catch (err) {
            console.error(err);

        }

    }
    const toogleCheck = async (id) => {
        try {
            const res = await fetch(`http://localhost:3001/api/todos/${id}/toggle`, {
                method: "PATCH"
            })

            const updatedTodo = await res.json()
            setTodos(p => p.map(m => (m._id === id ? { ...m, completed: updatedTodo.todo.completed } : m)))

        } catch (err) { }
    }

    const del = async (id) => {
        try {
            // const updatedTodos = todos.filter((_, i) => i !== index)
            const res = await fetch(`http://localhost:3001/api/todos/${id}`, {
                method: "DELETE",
            })
            const data = await res.json()
            setTodos(data.todo)
        } catch (err) {
            console.error(err);

        }
    }

    const edit = async (id) => {
        try {
            const res = await fetch(`http://localhost:3001/api/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: editingText ? editingText : text })
            })
            const data = await res.json()
            console.log(data);

            setTodos(todos)
            setEditingId(null)
            setEditingText("")


        } catch (err) {

        }
    }

    return (
        <div className='flex max-sm:w-80 max-sm:h-130  md: w-162 h-190  rounded-2xl  flex-col gap-8 bg-indigo-600 mt-20 ' >
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-top  items-center w-[100%] '>

                <h1 className='text-4xl mt-8 text-white font-mono'>Todo List</h1>

                <input type="text"
                    {...register("todo", { required: "please write something!" })}
                    placeholder='Write Here'
                    className='border-b-2 w-[80%] mt-15 text-gray-400 border-b-neutral-400 focus:outline-none   focus:ring-0 focus:border-white  focus:text-blue-50'
                />
                {errors.todo && (
                    <span className=' text-[14px] text-red-600'> {errors.todo.message} </span>
                )}
                <button type='submit' className='btn-primary mt-10 '>Add</button>


            </form>
            <hr className='w-[40%] flex m-auto border-1 border-gray-400' />
            <div className=' w-[100%] h-[63%] overflow-auto '>
                {!todos ? (<p className='text-white flex justify-center underline'>No todo to show!</p>) :
                    (<ul className='ml-5 flex flex-col gap-3'>
                        {todos.map((todo) => {
                            return (

                                <li className=' text-white flex items-center' key={todo._id}>
                                    <input className='ml-2' checked={todo.completed} onChange={() => toogleCheck(todo._id)} type="checkbox" name="check" id="" />

                                    {editingId === todo._id ? (
                                        <input type="text"
                                            value={editingText}
                                            onChange={(e) => setEditingText(e.target.value)}
                                            onBlur={() => edit(todo._id)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault()
                                                    edit(todo._id)
                                                }
                                            }}
                                            autoFocus
                                        />
                                    ) : (

                                        <span className={todo.completed ? "line-through text-black" : ""}>{todo.text}</span>
                                    )}
                                    <FaRegEdit onClick={() => {
                                        edit(todo._id)
                                        setEditingId(todo._id)
                                        setEditingText(todo.text)
                                    }} className='ml-auto' />
                                    <MdDeleteOutline onClick={() => { del(todo._id) }} className='mx-2' />
                                </li>

                            )
                        })
                        }

                    </ul>
                    )}
            </div>
        </div>
    )
}

export default TodoForm
