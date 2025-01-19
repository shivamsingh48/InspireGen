import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import BuyCredit from './components/BuyCredit'
import Result from './components/Result'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/result' element={<Result/>}/>
      <Route path='/buy' element={<BuyCredit/>}/>
    </Routes>
    </div>
  )
}

export default App