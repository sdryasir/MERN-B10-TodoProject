import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function AddTodo() {

    const {id} = useParams()


    const splitmessage = (message)=>{
        return message.includes(',') ? message.split(',') : message;
    }

    const [todo, setTodo] = useState({
        title: '',
        body: '',
        status: false
    })


    const [message, setMessage] = useState('')
    const [serverMessages, setServerMessages] = useState([])


    const getDataById = async ()=>{
        try {
            await axios.get(`http://localhost:8000/v1/todo/todo/${id}`)
                .then(res => {

                    console.log(res);
                    setTodo({title: res.data.title, body:res.data.body, status:res.data.status});
                })
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        if(id) getDataById()
    },[id])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(id){
            try {
                await axios.put(`http://localhost:8000/v1/todo/update-todo/${id}`, todo)
                    .then(res => {
                        const r = splitmessage(res.data.message)
                        if(typeof r !== 'string'){
                            setServerMessages(r)
                        }else{
                            setMessage(res.data.message) 
                        }
                        
                    })
            } catch (error) {
                setMessage(error.message)
            }
        }else{
            try {
                await axios.post('http://localhost:8000/v1/todo/new-todo', todo)
                    .then(res => {
                        const r = splitmessage(res.data.message)
                        if(typeof r !== 'string'){
                            setServerMessages(r)
                        }else{
                            setMessage(res.data.message) 
                        }
                        
                    })
            } catch (error) {
                setMessage(error.message)
            }
        }
    }


    

    return (
        <div>
            <p>{message}</p>
            {
                serverMessages.map((er, i)=><p key={i}>{er}</p>)
            }
            <p>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Add Todo
                </button>
            </p>
            <div class={`collapse ${id ? 'show': ''}`} id="collapseExample">
                <div class="card card-body">
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label for="title" class="form-label">Enter Title</label>
                            <input type="text" onChange={(e) => setTodo({ ...todo, title: e.target.value })} value={todo.title ? todo.title:''} class="form-control" name='title' id="title" />
                        </div>
                        <div class="mb-3">
                            <label for="body" class="form-label">Enter Description</label>
                            <input type="text" onChange={(e) => setTodo({ ...todo, body: e.target.value })} value={todo.body ? todo.body:''} class="form-control" name='body' id="body" />
                        </div>
                        <div class="mb-3">
                            <label for="Status" class="form-label">Status</label>
                            <select class="form-select" value={todo.status} onChange={(e) => setTodo({ ...todo, status: e.target.value })} name='status' aria-label="Default select example">
                                <option value="true">Read</option>
                                <option value="false">Unread</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <input type="submit" className='btn btn-success' value="Save Todo" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTodo