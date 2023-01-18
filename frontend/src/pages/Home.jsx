import React from 'react'
import AddTodo from '../components/AddTodo'
import TodoList from './TodoList'

function Home() {
  return (
    <div>
      <AddTodo/>
      <TodoList/>
    </div>
  )
}

export default Home