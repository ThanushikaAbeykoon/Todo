import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TodoList from './TodoList';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksByDate, setTasksByDate] = useState({});
  const [input, setInput] = useState('');

  // Format date as 'YYYY-MM-DD' for keys
  const formatDate = (date) => date.toISOString().split('T')[0];

  const handleAdd = () => {
    if (input.trim() === '') return;

    const dateKey = formatDate(selectedDate);
    const newTask = { text: input, completed: false };

    setTasksByDate(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newTask]
    }));

    setInput('');
  };

  const toggleComplete = (index) => {
    const dateKey = formatDate(selectedDate);
    const updatedTasks = [...(tasksByDate[dateKey] || [])];
    updatedTasks[index].completed = !updatedTasks[index].completed;

    setTasksByDate(prev => ({
      ...prev,
      [dateKey]: updatedTasks
    }));
  };

  const handleDelete = (index) => {
    const dateKey = formatDate(selectedDate);
    const updatedTasks = tasksByDate[dateKey].filter((_, i) => i !== index);

    setTasksByDate(prev => ({
      ...prev,
      [dateKey]: updatedTasks
    }));
  };

  return (
    <div className="app">
      <h1>📅 Calendar To-Do List</h1>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
      />

      <h2>Tasks for {formatDate(selectedDate)}</h2>

      <div className="input-area">
        <input
          type="text"
          placeholder="Add task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <TodoList
        todos={tasksByDate[formatDate(selectedDate)] || []}
        onToggle={toggleComplete}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
