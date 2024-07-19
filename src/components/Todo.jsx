import React, { useState } from "react";
import "./Todo.css";
// import './favicon.svg';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    setTodos([...todos, inputValue]);
    setInputValue(""); // Reset input value
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo, index) => index !== id);
    setTodos(newTodos);
  };

  const editTodo = (id) => {
    setEditIndex(id);
    setEditValue(todos[id]);
  };

  const saveTodo = (e) => {
    e.preventDefault();
    const newTodos = todos.map((todo, index) =>
      index === editIndex ? editValue : todo
    );
    setTodos(newTodos);
    setEditIndex(null);
    setEditValue("");
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  return (
    <>
      <div className="todo-form-div">
        <h2>CREATE TODO</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write todo..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit">Add TODO</button>
        </form>
        <div className="todo-display-div">
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                {editIndex === index ? (
                  <form onSubmit={saveTodo}>
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleEditChange}
                    />
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <>
                    {todo}
                    <button onClick={() => editTodo(index)} type="button">
                      Edit
                    </button>
                    <button onClick={() => deleteTodo(index)} type="button">
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
