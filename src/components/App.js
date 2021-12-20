import React, { useState, useEffect } from 'react';

import '../styles.css';

import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import EditForm from './EditForm';

const App = () => {
  /* formの状態 */
  const [todo, setTodo] = useState("");
  /* ulの状態 */
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    }else{
      return [];
    }
  });
  /* editページへの遷移の判別用の状態 */
  const [isEditing, setIsEditing] = useState(false);
  /* edit formの状態*/
  const [currentTodo, setCurrentTodo] = useState({});

  /*  todoに変更があった時のみlocalStorageに保持する*/
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputText = (e) => {
    setTodo(e.target.value);
  };

  /*  todoをulに追加してformを空にする*/
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

  /* delete button の関数 */
  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  /* edit form に入力したtextの反映 */
  const handleEditInputText = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  /* editページへの遷移とformに該当するtodoのtextを入力 */
  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  /* editしたtodoをtodosに反映してページ遷移 */
  const handleUpdateTodo = (id, updatedTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  /* editページの挙動 */
  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  return(
    <>
      <div className="App">
        {isEditing ? (
          <EditForm
            currentTodo={currentTodo}
            setIsEditing={setIsEditing}
            onEditInputText={handleEditInputText}
            onEditFormSubmit={handleEditFormSubmit}
          />
        ) : (
          <AddTodoForm 
            todo={todo}
            onAddInputText={handleInputText}
            onAddFormSubmit={handleFormSubmit}
          />
        )}
        
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem 
              todo={todo}
              onHandleEditClick={handleEditClick}
              onHandleDeleteClick={handleDeleteClick}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;