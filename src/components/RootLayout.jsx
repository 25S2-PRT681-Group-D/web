import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const RootLayout = () => {
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