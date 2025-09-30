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
    {path: '/', text: 'Home'},
    {path: '/dashboard', text: 'Dashboard'},
    {path: '/new-inspection', text: 'New Inspection'},
    {path: '/my-records', text: 'My Records'},
  ]

  return (
    <header className='bg-white w-full px-6 py-4 flex flex-row items-center justify-between shadow-lg shadow-black/10 border-b border-gray-100 min-h-[70px]'>
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition duration-300">
        <img src={logo} className='w-[180px] h-auto' />
        <div className="hidden sm:block">
          <span className="text-base text-gray-500 font-medium">Plant Health Analysis</span>
        </div>
      </Link>

      <nav className='flex flex-row items-center gap-6'>
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-6">
            {links.map((item) => {
              const {path, text} = item;
              return (
                <Link 
                  key={path}
                  to={path} 
                  className='text-base text-gray-700 font-medium hover:text-territoryochre transition duration-300 relative group'
                >
                  {text}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-territoryochre transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            })}
          </div>
        )}
        
        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Online</span>
            </div>
            <button 
              onClick={handleLogout}
              className='text-base text-gray-700 font-medium hover:text-red-600 transition duration-300 px-3 py-2 rounded-lg hover:bg-red-50'
            >
              Log Out
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header