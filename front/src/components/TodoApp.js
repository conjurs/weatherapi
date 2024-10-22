import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('pending');

  const statusOptions = ['pending', 'in-progress', 'completed', 'on-hold'];

  useEffect(() => {
    fetchTodos();
  }, [token]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3007/todos', {
        headers: { 'x-access-token': token },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  const handleAddTodo = async () => {
    try {
      await axios.post(
        'http://localhost:3007/todos',
        { title, description, status: 'pending' },
        { headers: { 'x-access-token': token } }
      );
      setTitle('');
      setDescription('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      await axios.put(
        `http://localhost:3007/todos/${id}`,
        updatedTodo,
        { headers: { 'x-access-token': token } }
      );
      setEditId(null);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/todos/${id}`, {
        headers: { 'x-access-token': token },
      });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  return (
    <div className="todo-app">
      <h2>todo</h2>
      <div className="todo-input">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddTodo}>add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.status}`}>
            {editId === todo.id ? (
              <div className="todo-edit">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleUpdateTodo(todo.id, { title: editTitle, description: editDescription, status: editStatus })}>
                  Save
                </button>
                <button onClick={() => setEditId(null)}>cancel</button>
              </div>
            ) : (
              <div className="todo-content">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <p>status: {todo.status}</p>
                <div className="todo-actions">
                  <button onClick={() => handleUpdateTodo(todo.id, { ...todo, status: 'completed' })}>
                    Mark Completed
                  </button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>delete</button>
                  <button onClick={() => {
                    setEditId(todo.id);
                    setEditTitle(todo.title);
                    setEditDescription(todo.description);
                    setEditStatus(todo.status);
                  }}>
                    Edit
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
