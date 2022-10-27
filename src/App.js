import React , { useState , useRef , useEffect } from "react";
import TodoList from "./TodoList.jsx";
import uuid from "react-uuid"
import './App.css'

const LOCAL_STORAGE_KEY = 'todoapp.todos'

const getLocalItems = () => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if( storedTodos ) return storedTodos
  else return []
}

function App() {

  const [todos , setTodos] = useState(getLocalItems)
  const todoNameRef = useRef()

  // useEffect(() => {
  //   const storedTodoss = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if( storedTodoss ) setTodos(storedTodoss)
  // }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggelTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }


  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if( name === '' ) return 
    setTodos(prevTodos => {
      return [ ...prevTodos , { id: uuid() , name: name, completed: false }]
    })
    todoNameRef.current.value = null
  }

  function handleclearTodos(e){
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  return (
    <>
      <div className="Main">
        <div className="title">
          <h1>To-Do List</h1>
          <p>
            Your Key To Successful Move, Let's Get Listed !
          </p>
        </div>
        
        <input ref={todoNameRef} type="text" className="inputBox" />
        <div className="_buttons">
          <button className="clearButton" onClick={handleclearTodos}>Clear Completed</button>
          <button className="addButton" onClick={handleAddTodo}>Add To-Do</button>
        </div>
        <div className="text">
          {todos.filter(todo => !todo.completed).length} left To-Do
        </div>

        <TodoList todos = {todos} toggelTodo={toggelTodo} />

      </div>
    </>
  )
}

export default App;
