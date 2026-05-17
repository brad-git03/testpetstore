import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Chip, Tooltip } from '@mui/material'
import { FavoriteBorderRounded, LocalMallRounded, VisibilityRounded } from '@mui/icons-material'
import api from '../../services/api'
import { useToast } from '../../components/ui/FeedbackProvider'

export default function PetCard({ pet }) {
  const { showToast } = useToast()
  const [busyAction, setBusyAction] = React.useState('')
  const displayPrice = pet.promoPrice || pet.price
  const stockQuantity = Number(pet.stockQuantity || 0)
  const isNew = pet.createdAt ? Date.now() - new Date(pet.createdAt).getTime() < 1000 * 60 * 60 * 24 * 14 : false

  const badgeItems = [
    pet.featured ? { label: 'Featured', className: 'bg-amber-100 text-amber-800' } : null,
    pet.promoPrice ? { label: 'Discount', className: 'bg-rose-100 text-rose-700' } : null,
    isNew ? { label: 'New', className: 'bg-sky-100 text-sky-700' } : null,
    stockQuantity <= 0 ? { label: 'Out of stock', className: 'bg-slate-200 text-slate-700' } : null
  ].filter(Boolean)

  const addToCart = async event => {
    event.preventDefault()
    event.stopPropagation()

    if (stockQuantity <= 0) {
      showToast('This pet is currently out of stock', 'warning')
      return
    }

    try {
      setBusyAction('cart')
      const variantsResponse = await api.get(`/pets/${pet.id}/variants`)
      const variants = variantsResponse.data || []
      const selectedVariant = variants.find(variant => Number(variant.stockQuantity || 0) > 0) || variants[0]

      if (!selectedVariant) {
        showToast('No purchasable variants are available', 'warning')
        return
      }

      await api.post('/cart/items', { petVariantId: selectedVariant.id, quantity: 1 })
      showToast(`${pet.name} added to cart`, 'success')
    } catch (error) {
      showToast('Unable to add item to cart', 'error')
    } finally {
      setBusyAction('')
    }
  }

  const addToWishlist = async event => {
    event.preventDefault()
    event.stopPropagation()

    try {
      setBusyAction('wishlist')
      await api.post(`/wishlist/${pet.id}`)
      showToast(`${pet.name} saved to wishlist`, 'success')
    } catch (error) {
      showToast('Unable to save to wishlist', 'error')
    } finally {
      setBusyAction('')
    }
  }

  return (
    <div className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <Link to={`/pets/${pet.id}`} className="block">
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-50 via-white to-sky-50">
          {pet.imageUrl ? (
            <img src={pet.imageUrl} alt={pet.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">No image</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {badgeItems.slice(0, 2).map(badge => (
              <Chip key={badge.label} label={badge.label} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.9)', color: '#0f172a', fontWeight: 700 }} />
            ))}
          </div>
          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            {stockQuantity > 0 ? `${stockQuantity} in stock` : 'Sold out'}
          </div>
          <div className="absolute inset-x-0 bottom-0 flex translate-y-4 gap-2 px-4 pb-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
            <Button component="span" fullWidth variant="contained" startIcon={<VisibilityRounded />} sx={{ borderRadius: 999, textTransform: 'none', boxShadow: 'none' }}>
              View
            </Button>
            <Tooltip title="Add to wishlist">
              <Button onClick={addToWishlist} variant="outlined" sx={{ minWidth: 0, borderRadius: 999, bgcolor: 'white' }}>
                <FavoriteBorderRounded fontSize="small" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </Link>
      <div className="space-y-4 p-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link to={`/pets/${pet.id}`} className="block text-lg font-extrabold text-slate-950 transition hover:text-amber-600">
                {pet.name}
              </Link>
              <div className="text-sm text-slate-500">{pet.breed || pet.category}</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-slate-950">${Number(displayPrice || 0).toFixed(2)}</div>
              {pet.promoPrice ? <div className="text-xs text-slate-400 line-through">${Number(pet.price || 0).toFixed(2)}</div> : null}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {badgeItems.map(badge => (
              <Chip key={badge.label} label={badge.label} size="small" className={badge.className} />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={addToCart}
            disabled={busyAction === 'cart' || stockQuantity <= 0}
            variant="contained"
            startIcon={<LocalMallRounded />}
            fullWidth
            sx={{ borderRadius: 999, textTransform: 'none', boxShadow: 'none' }}
          >
            {busyAction === 'cart' ? 'Adding...' : 'Add to cart'}
          </Button>
          <Button onClick={addToWishlist} disabled={busyAction === 'wishlist'} variant="outlined" sx={{ borderRadius: 999, minWidth: 52, bgcolor: '#fff' }}>
            <FavoriteBorderRounded fontSize="small" />
          </Button>
        </div>
      </div>
    </div>
  )
}
