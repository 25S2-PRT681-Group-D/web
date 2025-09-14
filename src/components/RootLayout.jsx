import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const RootLayout = () => {
  return (
    <div className='w-full h-screen bg-[#F5F5F5] flex flex-col items-center'>
      <Header />
      <div className='w-full max-w-[1440px] px-4 py-8 grow-1'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout