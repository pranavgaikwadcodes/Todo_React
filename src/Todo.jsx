import React from 'react'

export default function Todo({ todo ,toggelTodo }) {

    function handelTodoClick() {
        toggelTodo(todo.id)
    }

  return (
    <div>
        <label>
            <input type="checkbox" checked={todo.complete} onChange={handelTodoClick}></input>
            {todo.name}
        </label>
    </div>
  )
}
