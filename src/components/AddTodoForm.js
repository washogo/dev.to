import React from 'react';

const AddTodoForm = ({
  todo,
  onAddFormSubmit,
  onAddInputText
}) => {
  return (
    <form onSubmit={onAddFormSubmit}>
      <h2>Add Todo</h2>
      <label htmlFor="todo">Create todo: </label>
      <input
        name="todo"
        type="text"
        placeholder="Create a new todo"
        value={todo}
        onChange={onAddInputText}
      />
    </form>
  );
}

export default AddTodoForm;