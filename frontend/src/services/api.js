import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Attach auth token if present (simple example — integrate with auth provider)
api.interceptors.request.use(config => {
  try {
    const token = localStorage.getItem('access_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  } catch (e) {}
  return config
})

export default api
