import TodoForm from "./components/TodoForm";
import "./App.css";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    const feachTodos = async () => {
      try {
        const response = await axios.get("/api/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    feachTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!todo) {
      return;
    }

    if (editId) {
      try {
        await axios.put(`/api/todos/${editId}`, { todo });
        const updatedTodos = todos.map((t) =>
          t._id === editId ? { ...t, todo } : t
        );
        setTodos(updatedTodos);
        setEditId(0);
        setTodo("");
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    } else {
      // create new todo
      try {
        const response = await axios.post("/api/todos", { todo });
        setTodos([response.data, ...todos]);
        setTodo("");
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((t) => t._id != id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((t) => t._id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };
  
  return (
    <div className="container">
      <h1>ToDo List</h1>
      <TodoForm
        handleSubmit={handleSubmit}
        setTodo={setTodo}
        todo={todo}
        editId={editId}
      />
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default App;
