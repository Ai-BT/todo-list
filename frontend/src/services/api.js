import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/todos',
})

export const getTodos = () => api.get('/')
export const createTodo = (data) => api.post('/', data)
export const updateTodo = (id, data) => api.patch(`/${id}`, data)
export const deleteTodo = (id) => api.delete(`/${id}`)
