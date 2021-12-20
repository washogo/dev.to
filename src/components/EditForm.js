import React from 'react';

const EditForm = ({
  currentTodo,
  setIsEditing,
  onEditInputText,
  onEditFormSubmit
}) => {
  return (
    <form onSubmit={onEditFormSubmit}>
      <h2>Edit Todo</h2>
      <label htmlFor="updateTodo">Update todo: </label>
      <input
        name="updateTodo"
        type="text"
        placeholder="Update todo"
        value={currentTodo.text}
        onChange={onEditInputText}
      />
      <button type="submit" onClick={onEditFormSubmit}>
        Update
      </button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
  );
}

export default EditForm;