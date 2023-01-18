import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';

function TodoList() {

    //const {data:todos, error, loading} = useFetch('http://localhost:8000/v1/todo/todos')

    const [todos, setTodos] = useState([]);

    const getData = ()=>{
        axios.get('http://localhost:8000/v1/todo/todos').then(res=> {
            setTodos(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const handleDelete = async (id) => {
        try {
            const url = `http://localhost:8000/v1/todo/delete-todo/${id}`
            const res = await axios.delete(url);
            toast(res.data, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            
                getData();
        } catch (error) {
            toast(error.message, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }


    return (
        <div>
            <ul className='todoList'>
                {
                    todos.map(todo => {
                        return (
                            <li key={todo._id}>
                                <h4 style={{ textDecoration: todo.status === true ? 'line-through' : null }}>{todo.title}</h4>
                                <div className="control-btns">
                                    <button className='btn btn-success'><i class="bi bi-eye-fill"></i></button>
                                    <Link to={`/${todo._id}`} className='btn btn-info mx-1'><i class="bi bi-pencil-square"></i></Link>
                                    <button className='btn btn-danger' onClick={() => handleDelete(todo._id)}><i class="bi bi-trash3-fill"></i></button>
                                </div>
                            </li>
                        )
                    })
                }
                <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </ul>
        </div>
    )
}

export default TodoList