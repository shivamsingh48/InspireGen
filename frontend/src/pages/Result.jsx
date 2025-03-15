import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react';
import { AppContext } from '../context/AppContext';
import Loader from '../components/Loader';
import LoadingButton from '../components/LoadingButton';

const Result = () => {

  const[image,setImage]=useState(assets.sample_img_1);
  const[isImageLoaded,setIsImageLoaded]=useState(false);
  const[loading,setLoading]=useState(false);
  const[input,setInput]=useState("");

  const {generateImage,setShowLogin,user,theme}=useContext(AppContext)

  const handleSubmit=async(e)=>{
    e.preventDefault()
    if (!input.trim()) return;
    
    setLoading(true)
    try {
      if(input){
        const image=await generateImage(input)
        if(image){
          setIsImageLoaded(true)
          setImage(image)
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form 
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    onSubmit={handleSubmit}
    className='flex flex-col min-h-[90vh] justify-center items-center'>
      <div className='relative'>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded z-10">
            <Loader size="lg" message="Creating your image..." />
          </div>
        )}
        <img src={image} alt="" className='max-w-sm rounded shadow-lg'/>
      </div>

      {!isImageLoaded ?
      <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
        <input 
          type="text" 
          placeholder='Describe what you want to generate' 
          className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'
          onChange={(e)=>(setInput(e.target.value))} 
          value={input}
          disabled={loading}
        />
        <LoadingButton 
          onClick={()=>(!user && setShowLogin(true))}
          type='submit'
          isLoading={loading}
          loadingText="Generating"
          disabled={!input.trim()}
          className='bg-zinc-900 hover:bg-zinc-800 px-10 sm:px-16 py-3 rounded-full'
        >
          Generate
        </LoadingButton>
      </div>
      :
      <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
        <button 
          onClick={()=>setIsImageLoaded(false)}
          type="button"
          className={`bg-transparent border px-8 py-3 rounded-full cursor-pointer transition-colors ${
            theme === 'dark' 
              ? 'border-gray-300 text-gray-200 hover:bg-gray-700' 
              : 'border-zinc-900 text-black hover:bg-gray-100'
          }`}
        >
          Generate Another
        </button>
        <a 
          href={image} 
          download 
          className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer hover:bg-zinc-800 transition-colors flex items-center justify-center'
        >
          Download
        </a>
      </div>
      }
    </motion.form>
  )
}

export default Result