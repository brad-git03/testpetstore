import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Paper, TextField } from '@mui/material'
import api from '../../services/api'
import { useToast } from '../../components/ui/FeedbackProvider'

export default function Login() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [form, setForm] = React.useState({ email: '', password: '' })
  const [loading, setLoading] = React.useState(false)

  const submit = async event => {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/auth/login', form)
      localStorage.setItem('access_token', response.data.accessToken)
      localStorage.setItem('user_email', response.data.email)
      localStorage.setItem('user_name', response.data.fullName || response.data.email)
      localStorage.setItem('user_role', response.data.role)
      showToast('Welcome back!', 'success')
      navigate('/')
    } catch (error) {
      showToast('Invalid email or password', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2rem] bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-8 text-white shadow-2xl">
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Welcome back</div>
        <h1 className="mt-3 text-4xl font-black">Sign in to continue shopping</h1>
        <p className="mt-4 max-w-md text-white/80">Pick up where you left off, keep your wishlist handy, and finish checkout faster.</p>
      </div>

      <Paper className="rounded-[2rem] border border-slate-200 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">Login</h2>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <TextField label="Email" type="email" fullWidth value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} />
          <TextField label="Password" type="password" fullWidth value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} />
          <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ borderRadius: 999, py: 1.4, textTransform: 'none', boxShadow: 'none' }}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <div className="mt-5 text-sm text-slate-500">
          New here? <Link to="/register" className="font-semibold text-amber-600">Create an account</Link>
        </div>
      </Paper>
    </div>
  )
}
