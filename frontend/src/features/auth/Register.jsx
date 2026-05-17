import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Paper, TextField } from '@mui/material'
import api from '../../services/api'
import { useToast } from '../../components/ui/FeedbackProvider'

export default function Register() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [form, setForm] = React.useState({ fullName: '', email: '', password: '' })
  const [loading, setLoading] = React.useState(false)

  const submit = async event => {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/auth/register', form)
      localStorage.setItem('access_token', response.data.accessToken)
      localStorage.setItem('user_email', response.data.email)
      localStorage.setItem('user_name', response.data.fullName || response.data.email)
      localStorage.setItem('user_role', response.data.role)
      showToast('Account created', 'success')
      navigate('/')
    } catch (error) {
      showToast('Unable to create account', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Paper className="rounded-[2rem] border border-slate-200 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">Create your account</h2>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <TextField label="Full name" fullWidth value={form.fullName} onChange={event => setForm({ ...form, fullName: event.target.value })} />
          <TextField label="Email" type="email" fullWidth value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} />
          <TextField label="Password" type="password" fullWidth value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} />
          <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ borderRadius: 999, py: 1.4, textTransform: 'none', boxShadow: 'none' }}>
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
        <div className="mt-5 text-sm text-slate-500">
          Already have an account? <Link to="/login" className="font-semibold text-teal-600">Sign in</Link>
        </div>
      </Paper>

      <div className="rounded-[2rem] bg-[#0f766e] p-8 text-white shadow-2xl">
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-100">Join the pack</div>
        <h1 className="mt-3 text-4xl font-black">A smoother way to shop for pets.</h1>
        <p className="mt-4 max-w-md text-white/80">Save favorites, manage orders, and keep everything in one place.</p>
      </div>
    </div>
  )
}
