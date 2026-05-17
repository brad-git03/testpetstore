import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Divider, Paper, Skeleton } from '@mui/material'
import api from '../../services/api'
import { useToast } from '../../components/ui/FeedbackProvider'

export default function Checkout() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [cart, setCart] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    api.get('/cart')
      .then(res => setCart(res.data))
      .catch(() => setError('Unable to load cart'))
      .finally(() => setLoading(false))
  }, [])

  const confirmCheckout = () => {
    setSubmitting(true)
    api.post('/checkout')
      .then(() => {
        showToast('Order placed successfully', 'success')
        navigate('/orders')
      })
      .catch(() => setError('Checkout failed'))
      .finally(() => setSubmitting(false))
  }

  if (loading) {
    return <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 4 }} />
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">Secure checkout</div>
        <h1 className="text-3xl font-black text-slate-950">Review and place your order</h1>
      </div>

      {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div> : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Paper className="rounded-[1.5rem] border border-slate-200 p-5 shadow-sm">
          <div className="space-y-3">
            {(cart?.items || []).map(item => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div>
                  <div className="font-semibold text-slate-950">{item.petName}</div>
                  <div className="text-sm text-slate-500">Qty {item.quantity}</div>
                </div>
                <div className="font-black text-slate-950">${Number(item.lineTotal || 0).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </Paper>

        <Paper className="h-fit rounded-[1.5rem] border border-slate-200 p-5 shadow-sm lg:sticky lg:top-28">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">Order total</div>
          <div className="mt-2 text-3xl font-black text-slate-950">${Number(cart?.total || 0).toFixed(2)}</div>
          <Divider sx={{ my: 2 }} />
          <div className="space-y-2 text-sm text-slate-600">
            <SummaryRow label="Items" value={(cart?.items || []).length} />
            <SummaryRow label="Payment" value="Pay on confirmation" />
          </div>
          <Button
            fullWidth
            className="mt-5"
            variant="contained"
            disabled={submitting || !cart?.items?.length}
            onClick={confirmCheckout}
            sx={{ borderRadius: 999, py: 1.4, textTransform: 'none', boxShadow: 'none' }}
          >
            {submitting ? 'Placing order...' : 'Confirm order'}
          </Button>
        </Paper>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span>{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  )
}