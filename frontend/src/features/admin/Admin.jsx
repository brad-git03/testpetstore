import React from 'react'
import api from '../../services/api'
import { Avatar, Badge, Box, Button, Card, CardContent, Chip, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { AddRounded, DeleteOutlineRounded, EditRounded, Inventory2Rounded, PeopleOutlineRounded, ShoppingBagRounded } from '@mui/icons-material'

function StatCard({ label, value }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4, border: 'none', boxShadow: '0 4px 20px -10px rgba(20,184,166,0.15)' }}>
      <CardContent>
        <div className="text-sm font-semibold uppercase tracking-wider text-teal-600/80">{label}</div>
        <div className="mt-1 text-3xl font-black text-slate-800">{value}</div>
      </CardContent>
    </Card>
  )
}

const emptyPet = {
  name: '',
  category: '',
  breed: '',
  age: '',
  gender: '',
  price: '',
  stockQuantity: 0,
  promoPrice: '',
  description: '',
  imageUrl: '',
  vaccinationStatus: '',
  active: true,
  featured: false,
  trending: false
}

const emptyVariant = {
  petId: '',
  size: '',
  breedVariation: '',
  price: '',
  salePrice: '',
  stockQuantity: 0,
  sku: '',
  active: true,
  featured: false,
  trending: false,
  sortOrder: 0
}

export default function Admin() {
  const [dashboard, setDashboard] = React.useState(null)
  const [pets, setPets] = React.useState([])
  const [orders, setOrders] = React.useState([])
  const [variants, setVariants] = React.useState([])
  const [petForm, setPetForm] = React.useState(emptyPet)
  const [editingPetId, setEditingPetId] = React.useState(null)
  const [variantForm, setVariantForm] = React.useState(emptyVariant)
  const [message, setMessage] = React.useState('')

  const loadAll = React.useCallback(() => {
    Promise.all([api.get('/admin/dashboard'), api.get('/admin/pets'), api.get('/admin/orders')])
      .then(([dashRes, petsRes, ordersRes]) => {
        setDashboard(dashRes.data)
        setPets(petsRes.data || [])
        setOrders(ordersRes.data || [])
      })
      .catch(() => setMessage('Unable to load admin data'))
  }, [])

  React.useEffect(() => {
    loadAll()
  }, [loadAll])

  const loadVariants = petId => {
    if (!petId) return
    api.get(`/admin/pets/${petId}/variants`)
      .then(res => setVariants(res.data || []))
      .catch(() => setVariants([]))
  }

  const savePet = e => {
    e.preventDefault()
    const payload = {
      ...petForm,
      price: Number(petForm.price),
      stockQuantity: Number(petForm.stockQuantity || 0),
      promoPrice: petForm.promoPrice === '' ? null : Number(petForm.promoPrice)
    }
    const request = editingPetId ? api.put(`/admin/pets/${editingPetId}`, payload) : api.post('/admin/pets', payload)
    request
      .then(() => {
        setPetForm(emptyPet)
        setEditingPetId(null)
        setMessage('Pet saved')
        loadAll()
      })
      .catch(() => setMessage('Unable to save pet'))
  }

  const editPet = pet => {
    setEditingPetId(pet.id)
    setPetForm({
      name: pet.name || '',
      category: pet.category || '',
      breed: pet.breed || '',
      age: pet.age || '',
      gender: pet.gender || '',
      price: pet.price ?? '',
      stockQuantity: pet.stockQuantity ?? 0,
      promoPrice: pet.promoPrice ?? '',
      description: pet.description || '',
      imageUrl: pet.imageUrl || '',
      vaccinationStatus: pet.vaccinationStatus || '',
      active: pet.active ?? true,
      featured: pet.featured ?? false,
      trending: pet.trending ?? false
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deletePet = petId => {
    api.delete(`/admin/pets/${petId}`)
      .then(() => {
        if (editingPetId === petId) {
          setPetForm(emptyPet)
          setEditingPetId(null)
        }
        setMessage('Pet deleted')
        loadAll()
      })
      .catch(() => setMessage('Unable to delete pet'))
  }

  const resetPetForm = () => {
    setPetForm(emptyPet)
    setEditingPetId(null)
  }

  const saveVariant = e => {
    e.preventDefault()
    const payload = {
      ...variantForm,
      petId: Number(variantForm.petId),
      price: Number(variantForm.price),
      salePrice: variantForm.salePrice === '' ? null : Number(variantForm.salePrice),
      stockQuantity: Number(variantForm.stockQuantity),
      sortOrder: Number(variantForm.sortOrder)
    }
    api.post(`/admin/pets/${payload.petId}/variants`, payload)
      .then(() => {
        setVariantForm(emptyVariant)
        setMessage('Variant saved')
        loadAll()
      })
      .catch(() => setMessage('Unable to save variant'))
  }

  const updateOrderStatus = (orderId, status) => {
    api.patch(`/admin/orders/${orderId}/status`, { status })
      .then(() => {
        setMessage('Order updated')
        loadAll()
      })
      .catch(() => setMessage('Unable to update order'))
  }

  const updateStock = (variantId, stockQuantity) => {
    api.patch(`/admin/variants/${variantId}/stock`, { stockQuantity: Number(stockQuantity) })
      .then(() => {
        setMessage('Stock updated')
        if (variantForm.petId) loadVariants(variantForm.petId)
        loadAll()
      })
      .catch(() => setMessage('Unable to update stock'))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside>
        <div className="space-y-6 rounded-[1.5rem] border-none bg-white p-6 shadow-[0_4px_25px_-10px_rgba(15,23,42,0.05)]">
          <div className="flex items-center gap-4">
            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, fontWeight: 700 }}>AD</Avatar>
            <div>
              <div className="font-bold text-slate-800">Admin</div>
              <div className="text-sm text-slate-500">petstore@example.com</div>
            </div>
          </div>
          <Divider sx={{ borderColor: 'rgba(20,184,166,0.1)' }} />
          <nav className="space-y-2">
            <Button startIcon={<PeopleOutlineRounded />} fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none', color: '#475569', '&:hover': { bgcolor: 'rgba(20,184,166,0.08)', color: '#0f766e' } }}>Users</Button>
            <Button startIcon={<ShoppingBagRounded />} fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none', color: '#475569', '&:hover': { bgcolor: 'rgba(20,184,166,0.08)', color: '#0f766e' } }}>Orders</Button>
            <Button startIcon={<Inventory2Rounded />} fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none', color: '#0f766e', bgcolor: 'rgba(20,184,166,0.12)' }}>Inventory</Button>
            <Button startIcon={<AddRounded />} fullWidth variant="contained" sx={{ mt: 2, justifyContent: 'center', textTransform: 'none', borderRadius: 999, boxShadow: 'none' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Create pet</Button>
          </nav>
        </div>
      </aside>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard label="Users" value={dashboard?.users ?? 0} />
          <StatCard label="Orders" value={dashboard?.orders ?? 0} />
          <StatCard label="Pets" value={dashboard?.pets ?? 0} />
          <StatCard label="Variants" value={dashboard?.variants ?? 0} />
        </div>

        {message ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {message}
          </div>
        ) : null}

        <section className="rounded-[1.5rem] border-none bg-white p-6 shadow-[0_4px_25px_-10px_rgba(15,23,42,0.05)]">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-800">{editingPetId ? 'Edit pet' : 'Create pet'}</h2>
              <p className="text-sm text-slate-500">Add catalog animals that can be managed directly from the admin dashboard.</p>
            </div>
            {editingPetId ? (
              <Button variant="outlined" color="secondary" onClick={resetPetForm} sx={{ textTransform: 'none', borderRadius: 999 }}>
                Cancel edit
              </Button>
            ) : null}
          </div>
          <form onSubmit={savePet} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <TextField label="Name" value={petForm.name} onChange={e => setPetForm({ ...petForm, name: e.target.value })} fullWidth required />
              <TextField label="Category" value={petForm.category} onChange={e => setPetForm({ ...petForm, category: e.target.value })} fullWidth required />
              <TextField label="Breed" value={petForm.breed} onChange={e => setPetForm({ ...petForm, breed: e.target.value })} fullWidth />
              <TextField label="Age" value={petForm.age} onChange={e => setPetForm({ ...petForm, age: e.target.value })} fullWidth />
              <TextField label="Gender" value={petForm.gender} onChange={e => setPetForm({ ...petForm, gender: e.target.value })} fullWidth />
              <TextField label="Stock quantity" type="number" inputProps={{ min: 0 }} value={petForm.stockQuantity} onChange={e => setPetForm({ ...petForm, stockQuantity: e.target.value })} fullWidth />
              <TextField label="Price" type="number" inputProps={{ min: 0, step: '0.01' }} value={petForm.price} onChange={e => setPetForm({ ...petForm, price: e.target.value })} fullWidth required />
              <TextField label="Promo price" type="number" inputProps={{ min: 0, step: '0.01' }} value={petForm.promoPrice} onChange={e => setPetForm({ ...petForm, promoPrice: e.target.value })} fullWidth />
              <TextField label="Image URL" value={petForm.imageUrl} onChange={e => setPetForm({ ...petForm, imageUrl: e.target.value })} fullWidth />
              <TextField label="Vaccination status" value={petForm.vaccinationStatus} onChange={e => setPetForm({ ...petForm, vaccinationStatus: e.target.value })} fullWidth />
              <TextField label="Description" value={petForm.description} onChange={e => setPetForm({ ...petForm, description: e.target.value })} fullWidth multiline minRows={3} className="md:col-span-2" />
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button type="button" variant={petForm.active ? 'contained' : 'outlined'} color={petForm.active ? 'primary' : 'inherit'} onClick={() => setPetForm({ ...petForm, active: !petForm.active })} sx={{ textTransform: 'none', borderRadius: 999, boxShadow: 'none' }}>
                Active
              </Button>
              <Button type="button" variant={petForm.featured ? 'contained' : 'outlined'} color={petForm.featured ? 'secondary' : 'inherit'} onClick={() => setPetForm({ ...petForm, featured: !petForm.featured })} sx={{ textTransform: 'none', borderRadius: 999, boxShadow: 'none' }}>
                Featured
              </Button>
              <Button type="button" variant={petForm.trending ? 'contained' : 'outlined'} color={petForm.trending ? 'secondary' : 'inherit'} onClick={() => setPetForm({ ...petForm, trending: !petForm.trending })} sx={{ textTransform: 'none', borderRadius: 999, boxShadow: 'none' }}>
                Trending
              </Button>
              <div className="ml-auto">
                <Button type="submit" variant="contained" sx={{ textTransform: 'none', borderRadius: 999, boxShadow: 'none', px: 4 }}>
                  {editingPetId ? 'Update pet' : 'Save pet'}
                </Button>
              </div>
            </div>
          </form>
        </section>

        <section className="rounded-[1.5rem] border-none bg-white p-6 shadow-[0_4px_25px_-10px_rgba(15,23,42,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Manage pets</h2>
            <div>
              <TextField size="small" placeholder="Search pets" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 999 } }} />
            </div>
          </div>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(20,184,166,0.05)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: '#0f766e', borderBottom: 'none' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#0f766e', borderBottom: 'none' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#0f766e', borderBottom: 'none' }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#0f766e', borderBottom: 'none' }}>Stock</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: '#0f766e', borderBottom: 'none' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pets.map(p => (
                  <TableRow key={p.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ fontWeight: 600 }}>{p.name}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell>${Number(p.price || 0).toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip label={p.stockQuantity} size="small" color={p.stockQuantity > 0 ? 'success' : 'default'} sx={{ fontWeight: 700 }} />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => editPet(p)} sx={{ color: '#0f766e' }}><EditRounded /></IconButton>
                      <IconButton size="small" onClick={() => deletePet(p.id)} sx={{ color: '#ef4444' }}><DeleteOutlineRounded /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>

        <section className="rounded-[1.5rem] border-none bg-white p-6 shadow-[0_4px_25px_-10px_rgba(15,23,42,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Recent orders</h2>
          </div>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(20,184,166,0.05)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: '#0f766e', borderBottom: 'none' }}>Order</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#0f766e', borderBottom: 'none' }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#0f766e', borderBottom: 'none' }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#0f766e', borderBottom: 'none' }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: '#0f766e', borderBottom: 'none' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(o => (
                  <TableRow key={o.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ fontWeight: 600 }}>#{o.id}</TableCell>
                    <TableCell>{o.customerEmail}</TableCell>
                    <TableCell>${Number(o.total || 0).toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip label={o.status} size="small" color={o.status === 'PENDING' ? 'warning' : 'success'} sx={{ fontWeight: 700 }} />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="outlined" sx={{ textTransform: 'none', borderRadius: 999 }}>Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </div>
    </div>
  )
}


