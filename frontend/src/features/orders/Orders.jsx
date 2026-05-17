import React from 'react'
import { Button, Chip, Paper, Skeleton } from '@mui/material'
import { AccessTimeRounded, ReceiptLongRounded } from '@mui/icons-material'
import api from '../../services/api'

export default function Orders() {
  const [orders, setOrders] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    api.get('/orders')
      .then(res => setOrders(res.data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} variant="rectangular" height={120} sx={{ borderRadius: 4 }} />)}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">Order history</div>
        <h1 className="text-3xl font-black text-slate-950">Your recent orders</h1>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <Paper key={order.id} className="rounded-[1.5rem] border border-slate-200 p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <ReceiptLongRounded className="text-amber-500" />
                  <div className="text-lg font-bold text-slate-950">Order #{order.id}</div>
                  <Chip label={order.status} size="small" color={statusTone(order.status)} variant="outlined" />
                </div>
                <div className="text-sm text-slate-500">Placed for {order.customerEmail || 'your account'}</div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Total</div>
                  <div className="text-2xl font-black text-slate-950">${Number(order.total || 0).toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Created</div>
                  <div className="flex items-center gap-1 text-sm text-slate-600"><AccessTimeRounded fontSize="small" /> {formatDate(order.createdAt)}</div>
                </div>
                <Button variant="outlined" sx={{ borderRadius: 999, textTransform: 'none' }}>
                  View details
                </Button>
              </div>
            </div>
          </Paper>
        ))}

        {orders.length === 0 ? <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-8 text-slate-500">No orders yet.</div> : null}
      </div>
    </div>
  )
}

function statusTone(status) {
  switch ((status || '').toUpperCase()) {
    case 'PAID':
      return 'success'
    case 'SHIPPED':
      return 'info'
    case 'COMPLETED':
      return 'primary'
    case 'CANCELLED':
      return 'error'
    default:
      return 'warning'
  }
}

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}