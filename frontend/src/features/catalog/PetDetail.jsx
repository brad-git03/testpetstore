import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Chip, Divider, IconButton, Skeleton, Stack } from '@mui/material'
import { ArrowBackRounded, ArrowForwardRounded, FavoriteBorderRounded, LocalMallRounded, PetsRounded, ShieldOutlined, Inventory2Outlined } from '@mui/icons-material'
import api from '../../services/api'
import PetCard from './PetCard'
import { useToast } from '../../components/ui/FeedbackProvider'

export default function PetDetail() {
  const { id } = useParams()
  const { showToast } = useToast()
  const [pet, setPet] = useState(null)
  const [images, setImages] = useState([])
  const [variants, setVariants] = useState([])
  const [relatedPets, setRelatedPets] = useState([])
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedVariantId, setSelectedVariantId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')

  useEffect(() => {
    setLoading(true)
    Promise.all([
      api.get(`/pets/${id}`),
      api.get(`/pets/${id}/images`),
      api.get(`/pets/${id}/variants`)
    ])
      .then(([petRes, imagesRes, variantsRes]) => {
        const nextPet = petRes.data
        const nextImages = imagesRes.data || []
        const nextVariants = variantsRes.data || []
        setPet(nextPet)
        setImages(nextImages)
        setVariants(nextVariants)
        setActiveImageIndex(0)
        setSelectedVariantId(nextVariants.find(variant => Number(variant.stockQuantity || 0) > 0)?.id || nextVariants[0]?.id || null)

        api.get('/pets', { params: { category: nextPet.category, page: 0, size: 8 } })
          .then(response => {
            const related = (response.data?.content || []).filter(item => item.id !== nextPet.id).slice(0, 4)
            setRelatedPets(related)
          })
          .catch(() => setRelatedPets([]))
      })
      .catch(() => {
        setPet(null)
        setImages([])
        setVariants([])
        setRelatedPets([])
      })
      .finally(() => setLoading(false))
  }, [id])

  const activeImage = images[activeImageIndex]?.imageUrl || pet?.imageUrl || null
  const selectedVariant = variants.find(variant => variant.id === selectedVariantId) || variants[0] || null
  const displayPrice = selectedVariant?.salePrice || selectedVariant?.price || pet?.promoPrice || pet?.price || 0
  const stockQuantity = selectedVariant ? Number(selectedVariant.stockQuantity || 0) : Number(pet?.stockQuantity || 0)

  const stockLabel = useMemo(() => {
    if (stockQuantity <= 0) return { text: 'Out of stock', tone: 'error' }
    if (stockQuantity < 5) return { text: 'Low stock', tone: 'warning' }
    return { text: 'In stock', tone: 'success' }
  }, [stockQuantity])

  const addToCart = () => {
    if (!selectedVariant) {
      showToast('Choose a variant before adding to your adoption list', 'warning')
      return
    }

    api.post('/cart/items', { petVariantId: selectedVariant.id, quantity: 1 })
      .then(() => showToast(`Added ${pet.name} to adoption list`, 'success'))
      .catch(() => showToast('Unable to add to adoption list', 'error'))
  }

  const saveToWishlist = () => {
    api.post(`/wishlist/${id}`)
      .then(() => showToast('Saved to wishlist', 'success'))
      .catch(() => showToast('Unable to save to wishlist', 'error'))
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <Skeleton variant="rectangular" height={520} sx={{ borderRadius: 6 }} />
          <div className="space-y-4">
            <Skeleton variant="text" width="60%" height={48} />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="rectangular" height={160} sx={{ borderRadius: 4 }} />
            <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 999 }} />
          </div>
        </div>
      </div>
    )
  }
  if (!pet) return <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-slate-600">Pet not found</div>

  const imageCount = images.length || 1

  const goPrevious = () => setActiveImageIndex(current => (current - 1 + imageCount) % imageCount)
  const goNext = () => setActiveImageIndex(current => (current + 1) % imageCount)

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <Button component={Link} to="/" startIcon={<ArrowBackRounded />} sx={{ textTransform: 'none' }}>
          Back to shop
        </Button>
        <span>•</span>
        <span>{pet.category}</span>
      </div>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-amber-50 via-white to-sky-50 p-4 shadow-sm">
            <div className="flex min-h-[28rem] items-center justify-center rounded-[1.5rem] bg-white">
              {activeImage ? (
                <img src={activeImage} alt={pet.name} className="max-h-[28rem] w-full object-contain p-4" />
              ) : (
                <div className="text-slate-400">No image available</div>
              )}
            </div>
            <div className="absolute left-6 top-6 flex gap-2">
              <Chip icon={<PetsRounded fontSize="small" />} label={pet.featured ? 'Featured' : 'Catalog pick'} sx={{ bgcolor: 'rgba(255,255,255,0.92)', fontWeight: 700 }} />
              {pet.trending ? <Chip label="Trending" sx={{ bgcolor: 'rgba(254,242,242,0.95)', color: '#be123c', fontWeight: 700 }} /> : null}
            </div>
            {imageCount > 1 ? (
              <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between">
                <IconButton onClick={goPrevious} sx={{ bgcolor: 'rgba(255,255,255,0.95)', boxShadow: 2 }}>
                  <ArrowBackRounded />
                </IconButton>
                <IconButton onClick={goNext} sx={{ bgcolor: 'rgba(255,255,255,0.95)', boxShadow: 2 }}>
                  <ArrowForwardRounded />
                </IconButton>
              </div>
            ) : null}
          </div>

          {images.length > 1 ? (
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`overflow-hidden rounded-2xl border transition ${activeImageIndex === index ? 'border-amber-500 ring-2 ring-amber-200' : 'border-slate-200'}`}
                >
                  <img src={image.imageUrl} alt={image.altText || pet.name} className="h-24 w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">Pet detail</div>
                <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">{pet.name}</h1>
                <div className="mt-1 text-slate-500">{pet.breed || 'Friendly companion'} • {pet.category}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-right">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Starting at</div>
                <div className="text-3xl font-black text-slate-950">${Number(displayPrice || 0).toFixed(2)}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Chip icon={<ShieldOutlined fontSize="small" />} label={pet.vaccinationStatus || 'Checked'} sx={{ bgcolor: 'rgba(240,253,250,0.9)', color: '#047857', fontWeight: 700 }} />
              <Chip icon={<Inventory2Outlined fontSize="small" />} label={stockLabel.text} color={stockLabel.tone} variant="outlined" sx={{ fontWeight: 700 }} />
              {selectedVariant ? <Chip label={`${selectedVariant.size}${selectedVariant.breedVariation ? ` • ${selectedVariant.breedVariation}` : ''}`} sx={{ bgcolor: 'rgba(254,249,195,0.85)', color: '#854d0e', fontWeight: 700 }} /> : null}
            </div>

            <p className="text-base leading-7 text-slate-600">{pet.description}</p>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">Choose a variant</h2>
              <div className="text-sm text-slate-500">{variants.length} options</div>
            </div>
            <div className="grid gap-3">
              {variants.map(variant => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`rounded-2xl border p-4 text-left transition hover:border-amber-300 ${selectedVariantId === variant.id ? 'border-amber-500 bg-amber-50/60' : 'border-slate-200 bg-slate-50/60'}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-slate-950">{variant.size}</div>
                      <div className="text-sm text-slate-500">{variant.breedVariation || 'Standard'} {variant.sku ? `• SKU ${variant.sku}` : ''}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-950">${Number(variant.salePrice || variant.price || 0).toFixed(2)}</div>
                      <div className="text-xs text-slate-500">{variant.stockQuantity > 0 ? `${variant.stockQuantity} available` : 'Out of stock'}</div>
                    </div>
                  </div>
                </button>
              ))}
              {variants.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">No variants available for this pet yet.</div> : null}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={addToCart}
              disabled={stockQuantity <= 0 || actionLoading === 'cart'}
              variant="contained"
              startIcon={<LocalMallRounded />}
              fullWidth
              sx={{ borderRadius: 999, py: 1.5, textTransform: 'none', boxShadow: 'none' }}
            >
              Adopt {pet.name}
            </Button>
            <Button onClick={saveToWishlist} variant="outlined" startIcon={<FavoriteBorderRounded />} fullWidth sx={{ borderRadius: 999, py: 1.5, textTransform: 'none' }}>
              Save to wishlist
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <InfoTile title="Stock" value={stockLabel.text} />
            <InfoTile title="Price" value={`$${Number(displayPrice || 0).toFixed(2)}`} />
            <InfoTile title="Status" value={pet.featured ? 'Featured' : 'Popular'} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">Related pets</div>
          <h2 className="text-2xl font-bold text-slate-950">More pets in {pet.category}</h2>
        </div>
        {relatedPets.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {relatedPets.map(relatedPet => (
              <PetCard key={relatedPet.id} pet={relatedPet} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-6 text-slate-500">No related pets found yet.</div>
        )}
      </section>
    </div>
  )
}

function InfoTile({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{title}</div>
      <div className="mt-2 font-semibold text-slate-950">{value}</div>
    </div>
  )
}
