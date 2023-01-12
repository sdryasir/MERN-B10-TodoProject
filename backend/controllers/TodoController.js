import {Todos} from '../model/todoSchema.js'

export const createTodo = async (req, res, next)=>{
    try{
        await Todos.create(req.body);
        res.json({
            message:'Todo has been created'
        })
    }catch(err){
        next(err)
    }  
}

export const getAllTodos = async (req, res, next)=>{
    const todos = await Todos.find()
    res.json(todos)
}

export const getTodoById = async (req, res, next)=>{
    const {id} = req.params;
    const todo = await Todos.findById(id)
    res.json(todo)
}

export const updateTodo =  async (req, res, next)=>{
    const {id} = req.params
    await Todos.findByIdAndUpdate(id, req.body)
    res.json({
        message:'Todo has been Updated'
    })
}

export const deleteTodo = async (req, res, next)=>{
    try{
        const todo = await Todos.findById(req.params.id)
        todo.delete()
        res.json("Item has been delete")
    }catch(err){
        next(err)
    }
}