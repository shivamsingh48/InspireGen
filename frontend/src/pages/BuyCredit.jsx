import React, { useContext, useState } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const BuyCredit = () => {

  const { user, backendUrl, loadCreditData, setShowLogin, token, theme } = useContext(AppContext)

  const navigate = useNavigate()

  const initPay=async(order)=>{
    const options={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name: 'Credits payment',
      description: 'Credits payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response)=>{
        try {
          
          const res=await axios.post(`${backendUrl}/api/v1/users/verify-razor`,response,
            {withCredentials:true}
          )
          const paymentInfo=res.data;          
          if(paymentInfo.success){
            loadCreditData()
            navigate('/')
            toast.success('Credit Added')
          }

        } catch (error) {
          if (error.response && error.response.data) {
            toast.error(error.response.data.message || 'Something went wrong');
          } else {
            toast.error('An unexpected error occurred');
          }
        }
        
      }
    }
    const rzp=new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay = async (planId) => {
    try {

      if(!user){
        setShowLogin(true)
      }
      else{
        const response=await axios.post(`${backendUrl}/api/v1/users/pay-razor`,{planId},
          {withCredentials:true}
        )
        const paymentInfo=response.data
        console.log(response)

        if(paymentInfo.success){
          initPay(paymentInfo.data)
        }

      }

    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Something went wrong');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 dark:border-gray-600 px-10 py-2 rounded-full mb-6 dark:text-gray-300'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div key={index}
            className={`${theme === 'dark' ? 'bg-gray-800 drop-shadow-sm border-gray-700 text-gray-300' : 'bg-white drop-shadow-sm border text-gray-600'} border rounded-lg py-12 px-8 hover:scale-105 transition-all duration-500`}>
            <img src={assets.logo_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>${item.price}</span>/ {item.credits} credits</p>
            <button
              onClick={()=>paymentRazorpay(item.id)}
              className={`w-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'} text-white mt-8 text-sm rounded-md py-2.5 min-w-52 transition-colors`}>
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>

    </motion.div>
  )
}

export default BuyCredit