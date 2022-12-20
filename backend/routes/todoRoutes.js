import express from "express";
import { 
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
 } from "../controllers/TodoController.js";

const router = express.Router()

router.route('/new-todo').post(createTodo)
router.route('/todos').get(getAllTodos)
router.route('/todo/:id').get(getTodoById)
router.route('/update-todo/:id').put(updateTodo)
router.route('/delete-todo/:id').delete(deleteTodo)


export default router
