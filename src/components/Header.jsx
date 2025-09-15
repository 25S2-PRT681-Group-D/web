import React from 'react'
import logo from '../assets/AgroScan.svg'

const links = [
  {path: '/', text: 'Dashboard'},
  {path: '/new-inspection', text: 'New Inspection'},
  {path: '/my-records', text: 'My Records'},
  {path: '/log-out', text: 'Log Out'}
]

const Header = () => {
  return (
    <div className='bg-white w-full px-4 py-6 flex flex-row items-center justify-between shadow-lg shadow-black/25'>
      <img src={logo} className='w-[200px] h-auto' />

      <div className='flex flex-row items-center gap-4'>
        {links.map((item) => {
          const {path, text} = item;
          return <a href={path} className='text-lg text-[#36454F] font-semibold font-zilla' >{text}</a>
        })}
      </div>
    </div>
  )
}

export default Header