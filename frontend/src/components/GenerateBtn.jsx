import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const GenerateBtn = () => {

  const {user, setShowLogin, theme} = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if(user) 
      navigate('/result');
    else
      setShowLogin(true)        
  }

  return (
    <motion.div 
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className='pb-16 text-center'>
        <h1 className='text-sxl md:text-4xl lg:text-4xl mt-4 font-semibold text-neutral-800 dark:text-gray-100 py-6 md:py-16'>See the magic. Try now</h1>
        <motion.button 
        onClick={onClickHandler}
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        initial={{opacity:0}}
        animate={{opacity:1}}
        className={`inline-flex items-center gap-2 px-12 py-3 rounded-full text-white m-auto hover:scale-105 transition-all duration-500 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-black hover:bg-gray-800'}`}>
            Generate Images
            <img src={assets.star_group} className='h-6' alt="" />
        </motion.button>
    </motion.div>
  )
}

export default GenerateBtn