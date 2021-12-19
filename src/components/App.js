import React, { useState, useEffect } from 'react';

import '../styles.css';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    }else{
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputText = (e) => {
    setTodo(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (todo !== "") {
      setTodos([...todos, {
        id: todos.length + 1,
        text: todo.trim()
      }])
    }

    setTodo("");
  };

  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  return(
    <>
      <div className="App">
        <form onSubmit={handleFormSubmit}>
          <input
            name="todo"
            type="text"
            placeholder="Create a new todo"
            value={todo}
            onChange={handleInputText}
          />
        </form>
        
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>{todo.text}
              <button onClick={() => handleDeleteClick(todo.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;