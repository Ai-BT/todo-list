import React, { useState } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, { title: editTitle.trim() })
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setEditTitle(todo.title)
      setIsEditing(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      background: '#fff',
      borderRadius: '8px',
      marginBottom: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
      />

      {isEditing ? (
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            flex: 1,
            padding: '4px 8px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          style={{
            flex: 1,
            fontSize: '16px',
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#999' : '#333',
            cursor: 'pointer',
          }}
        >
          {todo.title}
        </span>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        style={{
          padding: '4px 12px',
          background: '#ff4444',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        삭제
      </button>
    </div>
  )
}
