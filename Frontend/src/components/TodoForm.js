import React from "react";

const TodoForm = ({ handleSubmit, setTodo, todo, editId }) => {
  return (
    <form className="TodoInput" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        placeholder="Enter Todo"
        onChange={(e) => setTodo(e.target.value)}
      ></input>
      <button type="submit" class="gobtn">
        {" "}
        {editId ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;
