import TodoForm from "./components/TodoForm";
import "./App.css";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import axios from "axios";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Fetch todos when logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in if a token exists
    }

    const feachTodos = async () => {
      if (!isLoggedIn) return; // Don't fetch todos if not logged in
      try {
        const response = await axios.get("/api/todos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in requests
          },
        });
        setTodos(response.data);
      } catch (error) {
        alert("Error fetching todos");
        console.error("Error fetching todos:", error);
      }
    };

    feachTodos();
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!todo) {
      return;
    }

    if (editId) {
      // Update existing todo

      try {
        await axios.put(
          `/api/todos/${editId}`,
          { todo },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in requests
              "Content-Type": "application/json",
            },
          }
        );
        // Update the todos state
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
        const response = await axios.post(
          "/api/todos",
          { todo },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setTodos([response.data, ...todos]);
        setTodo("");
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((t) => t._id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  // auth logic

  const handleLogin = () => {
    setIsLoggedIn(true); // Update login state
  };

  const handleRegister = () => {
    setIsRegistering(false); // After registering, go to login
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setIsLoggedIn(false); // Update login state
    setTodos([]); // Clear todos on logout
  };

  return (
    <div className="container">
      <div className="top">
        <h1>ToDo List</h1>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : (
          ""
        )}
      </div>
      {isLoggedIn ? (
        <>
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
        </>
      ) : (
        <>
          {isRegistering ? (
            <RegisterForm onRegister={handleRegister} />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
          {/* Toggle between forms */}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </>
      )}
    </div>
  );
};

export default App;
