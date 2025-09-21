import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '../assets/AgroScan.svg'
import { logout } from '../store/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully!')
    navigate('/auth')
  }

  const links = [
    {path: '/', text: 'Dashboard'},
    {path: '/new-inspection', text: 'New Inspection'},
    {path: '/my-records', text: 'My Records'},
  ]

  return (
    <div className='bg-white w-full px-4 py-6 flex flex-row items-center justify-between shadow-lg shadow-black/25'>
      <Link to="/">
        <img src={logo} className='w-[200px] h-auto' />
      </Link>

      <div className='flex flex-row items-center gap-4'>
        {isAuthenticated && links.map((item) => {
          const {path, text} = item;
          return (
            <Link 
              key={path}
              to={path} 
              className='text-lg text-[#36454F] font-semibold font-zilla hover:text-territoryochre transition duration-300'
            >
              {text}
            </Link>
          )
        })}
        {isAuthenticated && (
          <button 
            onClick={handleLogout}
            className='text-lg text-[#36454F] font-semibold font-zilla hover:text-territoryochre transition duration-300'
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  )
}

export default Header