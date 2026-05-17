import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip
} from '@mui/material'
import {
  FavoriteBorderOutlined,
  HomeRounded,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  PersonOutlineOutlined,
  PetsRounded,
  ReceiptLongOutlined,
  SearchRounded,
  ShoppingCartOutlined,
  StorefrontRounded,
  AdminPanelSettingsOutlined
} from '@mui/icons-material'
import api from '../../services/api'
import { useToast } from '../ui/FeedbackProvider'

function getStoredUser() {
  const email = localStorage.getItem('user_email')
  const fullName = localStorage.getItem('user_name')
  const role = localStorage.getItem('user_role')
  return email ? { email, fullName, role } : null
}

function initials(label) {
  return (label || 'Guest')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()
}

export default function SiteLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useToast()
  const [user, setUser] = React.useState(getStoredUser())
  const [search, setSearch] = React.useState('')
  const [cartCount, setCartCount] = React.useState(0)
  const [wishlistCount, setWishlistCount] = React.useState(0)
  const [menuAnchor, setMenuAnchor] = React.useState(null)
  const [mobileAnchor, setMobileAnchor] = React.useState(null)

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (location.pathname === '/') {
      setSearch(params.get('q') || '')
    } else if (location.pathname !== '/') {
      setSearch('')
    }
  }, [location.pathname, location.search])

  React.useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      setUser(null)
      setCartCount(0)
      setWishlistCount(0)
      return
    }

    api.get('/auth/me')
      .then(res => {
        const nextUser = res.data || getStoredUser()
        setUser(nextUser)
        if (nextUser?.email) {
          localStorage.setItem('user_email', nextUser.email)
          localStorage.setItem('user_name', nextUser.fullName || nextUser.email)
          if (nextUser.role) localStorage.setItem('user_role', nextUser.role)
        }
      })
      .catch(() => setUser(getStoredUser()))

    api.get('/cart')
      .then(res => setCartCount(res.data?.items?.length || 0))
      .catch(() => setCartCount(0))

    api.get('/wishlist')
      .then(res => setWishlistCount((res.data || []).length))
      .catch(() => setWishlistCount(0))
  }, [location.pathname])

  const handleSearchSubmit = event => {
    event.preventDefault()
    const query = search.trim()
    navigate(query ? `/?q=${encodeURIComponent(query)}` : '/')
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_email')
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_role')
    setUser(null)
    setMenuAnchor(null)
    showToast('You have been signed out', 'info')
    navigate('/')
  }

  const navItems = [
    { label: 'Home', to: '/', icon: <HomeRounded fontSize="small" /> },
    { label: 'Orders', to: '/orders', icon: <ReceiptLongOutlined fontSize="small" /> },
    { label: 'Wishlist', to: '/wishlist', icon: <FavoriteBorderOutlined fontSize="small" /> }
  ]

  if (user?.role === 'ADMIN') {
    navItems.push({ label: 'Admin', to: '/admin', icon: <AdminPanelSettingsOutlined fontSize="small" /> })
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,247,237,0.9),_rgba(248,250,252,1)_45%)]">
      <AppBar position="sticky" elevation={0} color="transparent" sx={{ backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(148,163,184,0.18)' }}>
        <Toolbar className="mx-auto w-full max-w-7xl gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Box className="flex items-center gap-2">
            <IconButton className="lg:hidden" onClick={event => setMobileAnchor(event.currentTarget)}>
              <MenuOutlined />
            </IconButton>
            <Button component={Link} to="/" startIcon={<PetsRounded />} sx={{ color: 'inherit', textTransform: 'none', fontWeight: 800, letterSpacing: 0.2 }}>
              PetStore
            </Button>
          </Box>

          <Box className="hidden flex-1 items-center gap-3 lg:flex">
            <Box component="form" onSubmit={handleSearchSubmit} className="flex-1">
              <TextField
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search pets, breeds, or categories"
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: <SearchRounded className="mr-2 text-slate-400" fontSize="small" />
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 999,
                    backgroundColor: 'rgba(255,255,255,0.8)'
                  }
                }}
              />
            </Box>

            <Box className="flex items-center gap-1">
              {navItems.map(item => (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  startIcon={item.icon}
                  sx={{
                    color: location.pathname === item.to ? '#0f172a' : '#475569',
                    bgcolor: location.pathname === item.to ? 'rgba(251,146,60,0.14)' : 'transparent',
                    borderRadius: 999,
                    textTransform: 'none',
                    px: 1.5
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>

          <Box className="ml-auto flex items-center gap-1 sm:gap-2">
            <Tooltip title="Wishlist">
              <IconButton component={Link} to="/wishlist" color="inherit">
                <Badge badgeContent={wishlistCount} color="secondary">
                  <FavoriteBorderOutlined />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Cart">
              <IconButton component={Link} to="/cart" color="inherit">
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </Tooltip>

            {user ? (
              <>
                <Button onClick={event => setMenuAnchor(event.currentTarget)} startIcon={<Avatar sx={{ width: 30, height: 30, bgcolor: 'warning.main' }}>{initials(user.fullName || user.email)}</Avatar>} sx={{ color: 'inherit', textTransform: 'none', borderRadius: 999 }}>
                  <span className="hidden sm:inline">{user.fullName || user.email}</span>
                </Button>
                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
                  <MenuItem component={Link} to="/orders" onClick={() => setMenuAnchor(null)}>
                    <ReceiptLongOutlined className="mr-2" fontSize="small" /> Orders
                  </MenuItem>
                  <MenuItem component={Link} to="/wishlist" onClick={() => setMenuAnchor(null)}>
                    <FavoriteBorderOutlined className="mr-2" fontSize="small" /> Wishlist
                  </MenuItem>
                  {user.role === 'ADMIN' ? (
                    <MenuItem component={Link} to="/admin" onClick={() => setMenuAnchor(null)}>
                      <StorefrontRounded className="mr-2" fontSize="small" /> Admin
                    </MenuItem>
                  ) : null}
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <LogoutOutlined className="mr-2" fontSize="small" /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" startIcon={<LoginOutlined />} sx={{ color: '#0f172a', bgcolor: 'white', borderRadius: 999, textTransform: 'none', px: 2 }}>
                  Sign in
                </Button>
                <Button component={Link} to="/register" variant="contained" sx={{ borderRadius: 999, textTransform: 'none', px: 2.2, boxShadow: 'none' }}>
                  Join
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={mobileAnchor} open={Boolean(mobileAnchor)} onClose={() => setMobileAnchor(null)}>
        {navItems.map(item => (
          <MenuItem key={item.to} component={Link} to={item.to} onClick={() => setMobileAnchor(null)}>
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </MenuItem>
        ))}
      </Menu>

      <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <Box component="form" onSubmit={handleSearchSubmit} className="mb-5 lg:hidden">
          <TextField
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search pets, breeds, or categories"
            fullWidth
            size="small"
            InputProps={{
              startAdornment: <SearchRounded className="mr-2 text-slate-400" fontSize="small" />
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.86)'
              }
            }}
          />
        </Box>
        {children}
      </main>
    </div>
  )
}