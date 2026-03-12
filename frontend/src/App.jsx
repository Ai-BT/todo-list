import React, { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api'
import { useTheme } from './context/ThemeContext'

export default function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const { theme, isDark, toggleTheme } = useTheme()

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const res = await getTodos()
      setTodos(res.data)
    } catch (err) {
      console.error('Failed to fetch todos:', err)
    }
  }

  const handleAdd = async (data) => {
    try {
      await createTodo(data)
      fetchTodos()
    } catch (err) {
      console.error('Failed to create todo:', err)
    }
  }

  const handleToggle = async (id, completed) => {
    try {
      await updateTodo(id, { completed })
      fetchTodos()
    } catch (err) {
      console.error('Failed to update todo:', err)
    }
  }

  const handleUpdate = async (id, data) => {
    try {
      await updateTodo(id, data)
      fetchTodos()
    } catch (err) {
      console.error('Failed to update todo:', err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id)
      fetchTodos()
    } catch (err) {
      console.error('Failed to delete todo:', err)
    }
  }

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter((t) => !t.completed).length

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
      }}>
        <h1 style={{ fontSize: '28px', margin: 0, color: theme.text }}>
          To-Do List
        </h1>
        <button
          onClick={toggleTheme}
          style={{
            padding: '8px 16px',
            background: 'none',
            border: `1px solid ${theme.textSecondary}`,
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '18px',
            color: theme.text,
            transition: 'all 0.3s',
          }}
          title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

      <TodoForm onAdd={handleAdd} />

      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
        justifyContent: 'center',
      }}>
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 16px',
              background: filter === f ? theme.filterActive : theme.filterInactive,
              color: filter === f ? theme.filterActiveText : theme.filterInactiveText,
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s',
            }}
          >
            {f === 'all' ? '전체' : f === 'active' ? '진행중' : '완료'}
          </button>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: theme.textSecondary, marginBottom: '16px', fontSize: '14px' }}>
        {activeCount}개 남음 | 더블클릭으로 수정
      </p>

      {filtered.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: theme.textPlaceholder, padding: '40px 0' }}>
          {filter === 'all' ? '할 일을 추가해보세요!' : '항목이 없습니다.'}
        </p>
      )}
    </div>
  )
}
