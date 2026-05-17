import React from 'react'
import api from '../../services/api'
import { Avatar, Badge, Box, Button, Card, CardContent, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { AddRounded, DeleteOutlineRounded, EditRounded, Inventory2Rounded, PeopleOutlineRounded, ShoppingBagRounded } from '@mui/icons-material'

function StatCard({ label, value }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <div className="text-sm text-slate-500">{label}</div>
        <div className="text-2xl font-bold">{value}</div>
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
      promoPrice: petForm.promoPrice === '' ? null : Number(petForm.promoPrice)
    }
    api.post('/admin/pets', payload)
      .then(() => {
        setPetForm(emptyPet)
        setMessage('Pet saved')
        loadAll()
      })
      .catch(() => setMessage('Unable to save pet'))
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
        <div className="space-y-6 rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar sx={{ bgcolor: 'primary.main' }}>AD</Avatar>
            <div>
              <div className="font-semibold text-slate-900">Admin</div>
              <div className="text-xs text-slate-500">petstore@example.com</div>
            </div>
          </div>
          <Divider />
          <nav className="space-y-2">
            <Button startIcon={<PeopleOutlineRounded />} fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>Users</Button>
            <Button startIcon={<ShoppingBagRounded />} fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>Orders</Button>
            <Button startIcon={<Inventory2Rounded />} fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none' }}>Inventory</Button>
            <Button startIcon={<AddRounded />} fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Create pet</Button>
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

        <section className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Manage pets</h2>
            <div>
              <TextField size="small" placeholder="Search pets" />
            </div>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pets.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell>${Number(p.price || 0).toFixed(2)}</TableCell>
                    <TableCell>{p.stockQuantity}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small"><EditRounded /></IconButton>
                      <IconButton size="small"><DeleteOutlineRounded /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>

        <section className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent orders</h2>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(o => (
                  <TableRow key={o.id}>
                    <TableCell>#{o.id}</TableCell>
                    <TableCell>{o.customerEmail}</TableCell>
                    <TableCell>${Number(o.total || 0).toFixed(2)}</TableCell>
                    <TableCell>{o.status}</TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="outlined" sx={{ textTransform: 'none' }}>Details</Button>
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


