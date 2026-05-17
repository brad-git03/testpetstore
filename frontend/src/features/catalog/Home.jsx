import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Box, Button, Chip, Divider, Paper, Skeleton } from '@mui/material'
import { ArrowForwardRounded, CategoryRounded, LocalOfferRounded, PetsRounded, StorefrontRounded, TrendingUpRounded } from '@mui/icons-material'
import api from '../../services/api'
import PetCard from './PetCard'

const categories = [
  { label: 'Dogs', description: 'Playful companions', query: 'Dogs', accent: 'from-amber-400 to-orange-500' },
  { label: 'Cats', description: 'Curious companions', query: 'Cats', accent: 'from-slate-500 to-slate-700' },
  { label: 'Birds', description: 'Bright and vocal', query: 'Birds', accent: 'from-emerald-400 to-teal-500' },
  { label: 'Fishes', description: 'Calm and colorful', query: 'Fishes', accent: 'from-sky-400 to-cyan-500' }
]

function formatMoney(value) {
  return `$${Number(value || 0).toFixed(2)}`
}

function PetSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <Skeleton variant="rectangular" height={220} />
      <div className="space-y-3 p-4">
        <Skeleton variant="text" width="70%" height={30} />
        <Skeleton variant="text" width="45%" />
        <Skeleton variant="text" width="90%" />
      </div>
    </div>
  )
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [debouncedQuery, setDebouncedQuery] = useState(searchParams.get('q') || '')
  const category = searchParams.get('category') || ''

  useEffect(() => {
    const nextQuery = searchParams.get('q') || ''
    setQuery(nextQuery)
    setDebouncedQuery(nextQuery)
    setPage(0)
  }, [searchParams])

  React.useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(handle)
  }, [query])

  React.useEffect(() => {
    setLoading(true)
    api
      .get('/pets', { params: { q: debouncedQuery || undefined, category: category || undefined, page, size: 12 } })
      .then(res => {
        const data = res.data.content || []
        setPets(Array.isArray(data) ? data : [])
        setTotalPages(res.data.totalPages || 1)
      })
      .catch(() => {
        setPets([])
        setTotalPages(1)
      })
      .finally(() => setLoading(false))
  }, [debouncedQuery, category, page])

  const featuredPets = pets.filter(pet => pet.featured).slice(0, 4)
  const heroPets = featuredPets.length ? featuredPets : pets.slice(0, 4)

  const applyCategory = value => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('category', value)
    nextParams.delete('q')
    setSearchParams(nextParams)
    setPage(0)
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-amber-50 via-white to-sky-50 shadow-[0_25px_60px_-24px_rgba(15,23,42,0.22)]">
        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-12">
          <div className="space-y-6">
            <Chip icon={<PetsRounded />} label="Modern pet shopping" sx={{ bgcolor: 'rgba(251,146,60,0.14)', color: '#9a3412', fontWeight: 700 }} />
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Find the perfect companion with a brighter, friendlier pet shop.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Browse featured pets, compare variants, save favorites, and check out with a polished shopping experience designed for pet lovers.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button component={Link} to="#featured-pets" variant="contained" endIcon={<ArrowForwardRounded />} sx={{ borderRadius: 999, px: 3, textTransform: 'none', boxShadow: 'none' }}>
                Shop featured pets
              </Button>
              <Button component={Link} to="/wishlist" variant="outlined" sx={{ borderRadius: 999, px: 3, textTransform: 'none' }}>
                View wishlist
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <InfoPill icon={<TrendingUpRounded fontSize="small" />} label="Featured picks" value={`${heroPets.length || 4} highlights`} />
              <InfoPill icon={<LocalOfferRounded fontSize="small" />} label="Savings" value="Seasonal promos" />
            </div>
          </div>

          <Paper className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.2),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.18),_transparent_30%)]" />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white/70">Today&apos;s promo</div>
                  <div className="text-3xl font-black">Up to 25% off</div>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-2 text-right text-xs uppercase tracking-[0.3em] text-white/70">
                  Pet favorites
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {heroPets.slice(0, 4).map(pet => (
                  <div key={pet.id} className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                    <div className="text-sm font-semibold">{pet.name}</div>
                    <div className="text-xs text-white/60">{pet.category} • {pet.breed || 'Friendly companion'}</div>
                    <div className="mt-2 text-lg font-black">{formatMoney(pet.promoPrice || pet.price)}</div>
                  </div>
                ))}
              </div>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.14)' }} />
              <div className="flex flex-wrap items-center gap-2 text-sm text-white/75">
                <Chip label="New arrivals" sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'white' }} />
                <Chip label="Wishlist-ready" sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'white' }} />
                <Chip label="Responsive checkout" sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'white' }} />
              </div>
            </div>
          </Paper>
        </div>
      </section>

      <section className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">Browse categories</div>
            <h2 className="text-2xl font-bold text-slate-950">Dogs, cats, birds, and fishes</h2>
          </div>
          <Button onClick={() => setSearchParams({})} sx={{ textTransform: 'none' }}>
            Clear filters
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {categories.map(categoryItem => (
            <button
              key={categoryItem.label}
              type="button"
              onClick={() => applyCategory(categoryItem.label)}
              className={`group rounded-[1.5rem] bg-gradient-to-br ${categoryItem.accent} p-[1px] text-left transition hover:-translate-y-1`}
            >
              <div className="h-full rounded-[1.45rem] bg-white p-4 shadow-sm transition group-hover:bg-slate-50">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-black text-slate-950">{categoryItem.label}</div>
                    <div className="text-sm text-slate-500">{categoryItem.description}</div>
                  </div>
                  <CategoryRounded className="text-slate-300" />
                </div>
                <div className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Shop now</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section id="featured-pets" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">Featured pets</div>
            <h2 className="text-2xl font-bold text-slate-950">Popular picks customers love</h2>
          </div>
          <div className="text-sm text-slate-500">
            {category ? `Filtered by ${category}` : debouncedQuery ? `Showing results for “${debouncedQuery}”` : 'Showing all pets'}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <PetSkeleton key={index} />
            ))}
          </div>
        ) : pets.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No pets match this filter yet.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {pets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button variant="outlined" disabled={page === 0} onClick={() => setPage(current => Math.max(current - 1, 0))} sx={{ borderRadius: 999, textTransform: 'none' }}>
            Previous
          </Button>
          <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
            Page {page + 1} of {totalPages}
          </span>
          <Button variant="contained" disabled={page + 1 >= totalPages} onClick={() => setPage(current => current + 1)} sx={{ borderRadius: 999, textTransform: 'none', boxShadow: 'none' }}>
            Next
          </Button>
        </div>
      </section>

      <section className="overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-[1px] shadow-lg">
        <div className="rounded-[1.7rem] bg-slate-950 px-6 py-8 text-white sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Seasonal promo</div>
              <h3 className="mt-2 text-3xl font-black">Save more on select pets and accessories this week.</h3>
              <p className="mt-3 max-w-2xl text-white/70">
                Highlight your favorites, compare variants, and complete checkout with a clean, mobile-friendly shopping flow.
              </p>
            </div>
            <div className="flex gap-3">
              <Button component={Link} to="/cart" variant="contained" sx={{ borderRadius: 999, bgcolor: 'white', color: '#0f172a', textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#f8fafc' } }}>
                View cart
              </Button>
              <Button component={Link} to="/orders" variant="outlined" sx={{ borderRadius: 999, color: 'white', borderColor: 'rgba(255,255,255,0.35)', textTransform: 'none' }}>
                Track orders
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function InfoPill({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-amber-100 p-2 text-amber-700">{icon}</div>
        <div>
          <div className="text-sm text-slate-500">{label}</div>
          <div className="font-semibold text-slate-950">{value}</div>
        </div>
      </div>
    </div>
  )
}
