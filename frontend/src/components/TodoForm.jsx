import React, { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd({ title: title.trim() })
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
    }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요..."
        style={{
          flex: 1,
          padding: '12px 16px',
          fontSize: '16px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '12px 24px',
          background: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        추가
      </button>
    </form>
  )
}
