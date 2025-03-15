import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import InspireGenLogo from './InspireGenLogo'

const Navbar = () => {
  const {user,setUser,setShowLogin,credit,logout,profile,theme,toggleTheme}=useContext(AppContext)
  
  const navigate=useNavigate()

  return (
    <div className='flex items-center justify-between py-9'>
        <Link to='/'><InspireGenLogo className='w-28 sm:w-30 lg:w-40' /></Link>
        <div className='flex items-center gap-3'>
          <button
            onClick={toggleTheme}
            className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-200">
                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {user?
          <div className='flex items-center gap-2 sm:gap-3'>
            <button onClick={()=>navigate('/buy')} className='flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
              <img className='w-5' src={assets.credit_star} alt="" />
              <p className='text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300'>Credit left : {credit}</p>
            </button>
            <p className='text-gray-600 dark:text-gray-300 max-sm:hidden pl-4'>Hi, {user.fullName}</p>
            <div className='relative group'>
              <img src={profile || assets.profile_icon} className='w-10 drop-shadow rounded-full' alt="" />
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black dark:text-white rounded pt-12'>
                <ul className='list-none m-0 p-2 bg-white dark:bg-gray-800 rounded-md border dark:border-gray-700 text-sm'>
                  <li 
                  onClick={logout}
                  className='py-1 px-2 cursor-pointer pr-10 hover:bg-gray-100 dark:hover:bg-gray-700'>Logout</li>
                </ul>
              </div>
            </div>
            
          </div>
          : 
          <div className='flex items-center gap-2 sm:gap-5'>
            <p onClick={()=>navigate('/buy')} className='cursor-pointer text-gray-700 dark:text-gray-300'>Pricing</p>
            <button 
            onClick={()=>(setShowLogin(true))}
            className='bg-zinc-800 dark:bg-zinc-700 text-white px-7 py-2 sm:px-10 text-sm rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors'>
            Login
            </button>
          </div>
          }
        </div>
    </div>
  )
}

export default Navbar