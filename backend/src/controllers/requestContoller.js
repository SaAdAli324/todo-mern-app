import express from "express"
import Todo from "../models/todos.js"
import mongoose from "mongoose"

export const getTodo = async (req, res) => {
  try {
    
    const todo = await Todo.find({userId:req.user.id})
    if (!todo || todo.length === 0) {
      return res.json({ message:userId })
    }
    res.json({ todo:todo })  

    
    
  } catch (err) {
    console.error("Error while sending todos", err);
    res.status(500).json({ message: "error while getting todos", success: false })

  }
}

export const postTodo = async (req, res) => {
  try {

    const { text, completed } = req.body
    const newTodo = new Todo({ text, completed: false, userId:req.user.id })
    await newTodo.save()
    res.status(201).json({ message: "todos saved!", todo: newTodo , success:true })
  } catch (err) {
    console.error("failed to save todos!", err);
  }
}

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params
    const del = await Todo.findByIdAndDelete({_id:id , userId:req.user.id})
    if (!del) {
      res.status(404).json({ message: "todo was'nt found" })
    }
    res.status(201).json({ message: 'todo deleted succesfully!'})

  }
  catch (err) {
    console.error("Error in deleting todo!", err);
    res.status(404).json({ message: "cant delete" })

  }
}

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params
    const { text } = req.body

    console.log(text);

    const updated = await Todo.findByIdAndUpdate({_id:id , userId:req.user.id}, {
      text: text,
      new: true
    })
    if (!updated) {
      return res.status(404).json({ message: "todo not found!" })
    }
    await updated.save()
    const newTodo = await Todo.find()
    res.status(202).json({ message: "note updated", todo: newTodo })
    console.log(updated);


  }
  catch (err) {
    console.error("error while updating", err);
    res.status(404).json({ message: "error while upadating!" })
  }
}

export const patchToggle = async (req, res) => {
  try {
    const { id } = req.params
    const todo = await Todo.findOne({_id:id , userId:req.user.id})

    if (!todo) {
      return res.status(404).json({ message: "todo not found for toogle!" })
    }
    const updatedTodo = await Todo.findByIdAndUpdate(id, { completed: todo.completed = !todo.completed }, { new: true })
    res.status(200).json({ message: "todo is marked completed!", todo: updatedTodo })
  } catch (err) {
    console.error("error occured while patching todo!", err);

  }
}




