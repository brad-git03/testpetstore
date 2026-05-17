import React from 'react'
import { Button, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { DeleteOutlineRounded, ShoppingBagOutlined } from '@mui/icons-material'
import api from '../../services/api'
import { useToast } from '../../components/ui/FeedbackProvider'

export default function Wishlist() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const { showToast } = useToast()

  React.useEffect(() => {
    api.get('/wishlist')
      .then(res => setItems(res.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  const removeItem = petId => {
    api.delete(`/wishlist/${petId}`)
      .then(res => setItems(res.data || []))
      .then(() => showToast('Removed from wishlist', 'info'))
      .catch(() => setItems([]))
  }

  if (loading) {
    return (
      <Stack spacing={2}>
        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} variant="rectangular" height={110} sx={{ borderRadius: 2 }} />)}
      </Stack>
    )
  }

  if (!items.length) {
    return (
      <Paper className="rounded-[1.25rem] p-8 text-center">
        <ShoppingBagOutlined className="text-5xl text-slate-300" />
        <Typography variant="h5" sx={{ mt: 2, fontWeight: 800 }}>Wishlist is empty</Typography>
        <Typography sx={{ mt: 1, color: 'text.secondary' }}>Save pets you like to compare them later.</Typography>
        <Button href="/" variant="contained" sx={{ mt: 3, borderRadius: 8, textTransform: 'none' }}>Browse pets</Button>
      </Paper>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map(item => (
        <Paper key={item.id} className="rounded-[1rem] p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-bold text-lg">{item.petName}</div>
              <div className="text-sm text-slate-500">{item.category}</div>
            </div>
            <div className="flex gap-2">
              <Button href={`/pets/${item.petId}`} variant="outlined" sx={{ textTransform: 'none' }}>View pet</Button>
              <Button onClick={() => removeItem(item.petId)} startIcon={<DeleteOutlineRounded />} sx={{ textTransform: 'none' }}>Remove</Button>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  )
}