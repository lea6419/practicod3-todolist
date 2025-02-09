import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getTodos() {
    try {
      const todos = await service.getTasks();
      setTodos(Array.isArray(todos) ? todos : []);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
    }
  }

  async function createTodo(e) {
    e.preventDefault();
    await service.addTask(newTodo);
    setNewTodo("");
    setIsModalOpen(false);
    await getTodos();
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo, isComplete);
    await getTodos();
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section style={styles.todoapp}>
      <header style={styles.header}>
        <h1 style={styles.title}>todos</h1>
        <button style={styles.addButton} onClick={() => setIsModalOpen(true)}>הוסף משימה</button>
        {isModalOpen && (
          <div style={styles.modal}>
            <form style={styles.modalContent} onSubmit={createTodo}>
              <input 
                style={styles.input} 
                placeholder="הכנס את שם המשימה" 
                value={newTodo} 
                onChange={(e) => setNewTodo(e.target.value)} 
              />
              <button style={styles.saveButton} type="submit">שמור</button>
              <button style={styles.closeButton} type="button" onClick={() => setIsModalOpen(false)}>סגור</button>
            </form>
          </div>
        )}
      </header>
      <section style={styles.main}>
        <ul style={styles.todoList}>
          {todos?.map(todo => (
            <li key={todo.id} style={todo.isComplete ? styles.completed : styles.todoItem}>
              <div style={styles.view}>
                <input type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                <label>{todo.name}</label>
                <button style={styles.destroyButton} onClick={() => deleteTodo(todo.id)}>🗑</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

const styles = {
  todoapp: { fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '0 auto', textAlign: 'center', background: '#f5f5f5', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' },
  header: { padding: '20px', background: '#34495e', color: 'white', borderRadius: '10px' },
  title: { margin: '0', fontSize: '24px' },
  addButton: { padding: '10px', background: '#1abc9c', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', transition: 'background 0.3s', fontSize: '16px' },
  modal: { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', borderRadius: '10px' },
  modalContent: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' },
  saveButton: { padding: '10px', background: '#2ecc71', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', transition: 'background 0.3s' },
  closeButton: { padding: '10px', background: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', transition: 'background 0.3s' },
  main: { padding: '10px' },
  todoList: { listStyle: 'none', padding: '0' },
  todoItem: { display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd', background: 'white', borderRadius: '5px', marginBottom: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' },
  completed: { textDecoration: 'line-through', color: '#7f8c8d' },
  view: { display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' },
  destroyButton: { background: 'none', border: 'none', cursor: 'pointer', color: '#c0392b', fontSize: '16px' }
};

export default App;
