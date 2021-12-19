import React, { useState } from 'react';

import '../styles.css';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

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
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;