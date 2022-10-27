import React from 'react'

export default function Todo({ todo ,toggelTodo }) {

    function handelTodoClick() {
        toggelTodo(todo.id)
    }

  return (
    <div className='todoDiv'>
        <label className='TodoLabels'>
            <input className='checkBox' type="checkbox" checked={todo.complete} onChange={handelTodoClick}></input>
            {todo.name}
        </label>
    </div>
  )
}
