import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import NatureBackground from './NatureBackground'
import { initializeAuth } from '../store/authSlice'

const RootLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, isInitialized } = useSelector((state) => state.auth)

  useEffect(() => {
    // Initialize auth state from storage
    dispatch(initializeAuth())
  }, [dispatch])

  useEffect(() => {
    // Only redirect after auth has been initialized
    if (isInitialized && !isAuthenticated && location.pathname !== '/auth' && location.pathname !== '/') {
      navigate('/auth')
    }
  }, [isAuthenticated, isInitialized, location.pathname, navigate])

  // Show loading while auth is being initialized
  if (!isInitialized) {
    return (
      <div className='w-full min-h-screen bg-cloudwhite flex flex-col font-zilla'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-12 h-12 bg-territoryochre rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-white text-xl'>🌱</span>
            </div>
            <p className='text-charcoalgrey'>Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen bg-cloudwhite flex flex-col font-zilla'>
      <Header />
      <main className='flex-1 w-full py-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout