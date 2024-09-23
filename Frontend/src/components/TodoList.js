import React from 'react'

const TodoList = ({ todos ,handleDelete,handleEdit}) => {
    return (
        <ul className='todo-list'>
            {
                todos.map((t) => (
                    <li className='todo'>
                        <span className='todoText'  key={t._id}>{t.todo}</span>
                        <button onClick={()=>{handleEdit(t._id)}}>Edit</button>
                        <button onClick={()=>handleDelete(t._id)}>Remove</button>
                    </li>
                ))
            }
        </ul>
    )
}

export default TodoList