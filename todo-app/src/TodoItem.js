import React from 'react';

function TodoItem({ todo, index, onToggle, onDelete }) {
  return (
    <div className="todo-item">
      <span
        onClick={() => onToggle(index)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer',
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(index)}>❌</button>
    </div>
  );
}

export default TodoItem;
