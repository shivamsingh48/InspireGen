import React, { useContext, useState, useEffect } from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import ResetPassword from './components/ResetPassword'
import StaticFavicon from './components/StaticFavicon'
import SplashScreen from './components/SplashScreen'
import { AppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify';
import {GoogleOAuthProvider} from '@react-oauth/google'

const App = () => {
  const {showLogin, token, theme} = useContext(AppContext)
  const [loading, setLoading] = useState(true)

  // Simulate initial app loading time
  useEffect(() => {
    // Set a reasonable loading time for the splash screen
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000) // Show splash screen for 2 seconds
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <StaticFavicon />
      
      {loading ? (
        <SplashScreen />
      ) : (
        <div className={`px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen ${
          theme === 'dark' 
          ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
          : 'bg-gradient-to-b from-teal-50 to-orange-50 text-gray-900'
        }`}>
          <ToastContainer 
            position='bottom-right'
            theme={theme}
          />
          <Navbar/>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE__CILENT_ID}>
          {showLogin && <Login/>}
          </GoogleOAuthProvider>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/result' element={<Result/>}/>
            <Route path='/buy' element={<BuyCredit/>}/>
            <Route path='/reset-password' element={<ResetPassword/>}/>
          </Routes>
          <Footer/>
        </div>
      )}
    </>
  )
}

export default App