import React from 'react'
import {assets} from '../assets/assets'
import InspireGenLogo from './InspireGenLogo'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-3 py-3 mt-20'>
        <InspireGenLogo className='w-36' />
        <p className='flex-1 border-l border-gray-400 dark:border-gray-600 pl-4 text-sm text-gray-500 dark:text-gray-400 max-sm:hidden'>Copyright @InspireGen.com | All right reserved.</p>

        <div className='flex gap-2.5'>
        <img src={assets.facebook_icon} alt="" width={35} className="hover:opacity-80 transition-opacity cursor-pointer" />          
        <img src={assets.twitter_icon} alt="" width={35} className="hover:opacity-80 transition-opacity cursor-pointer" />
        <img src={assets.instagram_icon} alt="" width={35} className="hover:opacity-80 transition-opacity cursor-pointer" />
        </div>
    </div>
  )
}

export default Footer