import express from "express";
import { 
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
 } from "../controllers/TodoController.js";
 import { isAuthenticatedUser, isAuthorizedUser } from "../middleware/auth.js";

const router = express.Router()

router.route('/new-todo').post(createTodo)
router.route('/todos').get(isAuthenticatedUser, isAuthorizedUser('admin', 'user', 'teacher'), getAllTodos)
router.route('/todo/:id').get(getTodoById)
router.route('/update-todo/:id').put(isAuthenticatedUser, isAuthorizedUser('admin', 'moderator'),updateTodo)
router.route('/delete-todo/:id').delete(isAuthenticatedUser, isAuthorizedUser('admin', 'moderator'), deleteTodo)


export default router
