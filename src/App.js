import React , { useState , useRef , useEffect } from "react";
import TodoList from "./TodoList.jsx";
import uuid from "react-uuid"

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
      <TodoList todos = {todos} toggelTodo={toggelTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add ToDo</button>
      <button onClick={handleclearTodos}>Clear Completed</button>
      <div>
        {todos.filter(todo => !todo.completed).length} left ToDo
      </div>
    </>
  )
}

export default App;
