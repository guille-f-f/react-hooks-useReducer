import React, { useReducer, useState } from "react";

const TYPES = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

const initialTodos = [];
const initialText = '';

const reducer = (state, action) => {
  switch(action.type) {
    case TYPES.DELETE: return state.filter(todo => todo.id !== action.payload);
    case TYPES.ADD: return [...state, action.payload]
    case TYPES.UPDATE: return state.map(todo => todo.id === action.payload.id ? action.payload : todo);
    default: return state;
  }
}


const TodoApp = () => {

  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {id: Date.now(), title: text};
    dispatch({
      type: TYPES.ADD, 
      payload: newTodo
    })
    setText(initialText)
  }

  return (
    <div>
      <h2>Todo App</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => dispatch({type: TYPES.DELETE, payload: todo.id})}>Eliminar</button>
            <button onClick={() => dispatch({type: TYPES.UPDATE, payload: {...todo, title: text}})}>Actualizar</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder=' Item de lista'
          // Para enlazar este 'input' con el estado tenemos que hacer dos cosas, asignar un 'value' y controlar el 'onChange'
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default TodoApp;
