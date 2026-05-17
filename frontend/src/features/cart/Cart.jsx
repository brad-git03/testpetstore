import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Divider, IconButton, Paper, Skeleton } from '@mui/material'
import { AddRounded, DeleteOutlineRounded, RemoveRounded, ShoppingBagOutlined } from '@mui/icons-material'
import api from '../../services/api'
import { useToast } from '../../components/ui/FeedbackProvider'

export default function Cart() {
  const [cart, setCart] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const { showToast } = useToast()

  const loadCart = React.useCallback(() => {
    setLoading(true)
    setError('')
    api.get('/cart')
      .then(res => setCart(res.data))
      .catch(() => {
        setCart(null)
        setError('Unable to load adoption list')
      })
      .finally(() => setLoading(false))
  }, [])

  React.useEffect(() => {
    loadCart()
  }, [loadCart])

  const updateQuantity = (itemId, quantity) => {
    api.put(`/cart/items/${itemId}`, { quantity })
      .then(res => setCart(res.data))
      .then(() => showToast('Adoption list updated', 'success'))
      .catch(() => setError('Unable to update adoption list'))
  }

  const removeItem = itemId => {
    api.delete(`/cart/items/${itemId}`)
      .then(res => setCart(res.data))
      .then(() => showToast('Item removed', 'info'))
      .catch(() => setError('Unable to remove item'))
  }

  const subtotal = Number(cart?.subtotal || 0)
  const itemCount = cart?.items?.reduce((total, item) => total + Number(item.quantity || 0), 0) || 0

  if (loading) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={140} sx={{ borderRadius: 4 }} />
          ))}
        </div>
        <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 4 }} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">Shopping bag</div>
        <h1 className="text-3xl font-black text-slate-950">Your adoption list</h1>
      </div>

      {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div> : null}

      {!cart || cart.items.length === 0 ? (
        <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <ShoppingBagOutlined className="text-5xl text-slate-300" />
          <div className="mt-4 text-2xl font-bold text-slate-950">Your adoption list is empty</div>
          <p className="mt-2 text-slate-500">Start adding pets you love and come back to complete checkout.</p>
          <Button component={Link} to="/" variant="contained" sx={{ mt: 3, borderRadius: 999, textTransform: 'none', boxShadow: 'none' }}>
            Browse pets
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {cart.items.map(item => (
              <Paper key={item.id} className="overflow-hidden rounded-[1.5rem] border border-slate-200 p-4 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="truncate text-lg font-bold text-slate-950">{item.petName}</div>
                    <div className="mt-1 text-sm text-slate-500">
                      {item.size}{item.breedVariation ? ` • ${item.breedVariation}` : ''}
                    </div>
                    <div className="mt-2 text-sm text-slate-500">${Number(item.unitPrice || 0).toFixed(2)} each</div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
                    <IconButton size="small" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                      <RemoveRounded fontSize="small" />
                    </IconButton>
                    <span className="w-8 text-center font-semibold text-slate-900">{item.quantity}</span>
                    <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <AddRounded fontSize="small" />
                    </IconButton>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <div className="text-right">
                      <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Line total</div>
                      <div className="text-xl font-black text-slate-950">${Number(item.lineTotal || 0).toFixed(2)}</div>
                    </div>
                    <Button onClick={() => removeItem(item.id)} startIcon={<DeleteOutlineRounded />} color="inherit" sx={{ textTransform: 'none' }}>
                      Remove
                    </Button>
                  </div>
                </div>
              </Paper>
            ))}
          </div>

          <Paper className="h-fit rounded-[1.5rem] border border-slate-200 p-5 shadow-sm lg:sticky lg:top-28">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">Order summary</div>
            <div className="mt-2 text-2xl font-black text-slate-950">Checkout overview</div>
            <Divider sx={{ my: 2 }} />
            <div className="space-y-3 text-sm text-slate-600">
              <SummaryRow label="Items" value={itemCount} />
              <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <SummaryRow label="Shipping" value="Calculated at checkout" />
            </div>
            <Divider sx={{ my: 2 }} />
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm text-slate-500">Total</div>
                <div className="text-3xl font-black text-slate-950">${subtotal.toFixed(2)}</div>
              </div>
              <Button component={Link} to="/checkout" variant="contained" sx={{ borderRadius: 999, textTransform: 'none', boxShadow: 'none' }}>
                Proceed to checkout
              </Button>
            </div>
          </Paper>
        </div>
      )}
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
