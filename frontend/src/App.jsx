import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'


const App = () => {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
    <Navbar/>
    <Login/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/result' element={<Result/>}/>
      <Route path='/buy' element={<BuyCredit/>}/>
    </Routes>
    <Footer/>
    </div>
  )
}

export default App