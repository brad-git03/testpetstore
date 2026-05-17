import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SiteLayout from '../components/layout/SiteLayout'

const Home = React.lazy(() => import('../features/catalog/Home'))
const PetDetail = React.lazy(() => import('../features/catalog/PetDetail'))
const Login = React.lazy(() => import('../features/auth/Login'))
const Register = React.lazy(() => import('../features/auth/Register'))
const Cart = React.lazy(() => import('../features/cart/Cart'))
const Checkout = React.lazy(() => import('../features/checkout/Checkout'))
const Orders = React.lazy(() => import('../features/orders/Orders'))
const Wishlist = React.lazy(() => import('../features/wishlist/Wishlist'))
const Admin = React.lazy(() => import('../features/admin/Admin'))

export default function AppRouter() {
  return (
    <SiteLayout>
      <Suspense fallback={<div className="px-4 py-12 text-center text-slate-500">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </SiteLayout>
  )
}
