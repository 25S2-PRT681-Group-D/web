import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { initializeAuth } from '../store/authSlice'

const RootLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    // Initialize auth state from storage
    dispatch(initializeAuth())
  }, [dispatch])

  useEffect(() => {
    // Redirect to auth page if not authenticated and not already on auth page
    if (!isAuthenticated && location.pathname !== '/auth') {
      navigate('/auth')
    }
  }, [isAuthenticated, location.pathname, navigate])

  return (
    <div className='w-full min-h-screen bg-cloudwhite flex flex-col items-center font-zilla'>
      <Header />
      <div className='flex flex-1 w-full max-w-[1440px] px-4 py-8'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout