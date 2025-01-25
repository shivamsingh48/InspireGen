import { createContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const [user,setUser]=useState(null);
    const [showLogin,setShowLogin]=useState(false);
    const [credit,setCredit]=useState(false)
    const [token,setToken]=useState('.')

    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const navigate=useNavigate()

    const loadCreditData=async()=>{
        try {
            const response=await axios.get(`${backendUrl}/api/v1/users/getUser`,
                {withCredentials: true})
            const userInfo=response.data
            console.log(response)
            if(userInfo.success){
                setCredit(userInfo.data.creditBalance)
                setUser(userInfo.data)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || 'Something went wrong');
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    }


    const generateImage=async(prompt)=>{
        try {
            
            const response=await axios.post(`${backendUrl}/api/v1/image/generate-image`,{prompt},
                {withCredentials: true}
            )
            if(imageInfo.success){
                loadCreditData()
                return imageInfo.data.resultImage
            }

        } catch (error) {
            if (error.response && error.response.data) {                
                toast.error(error.response.data.message || 'Something went wrong');
                navigate('/buy')
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    }

    const logout=async()=>{
        try {
            const response=await axios.post(`${backendUrl}/api/v1/users/logout`,{},
                { withCredentials: true })
            if(response.data.success){
                setToken('')
                setUser(null)
            }
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        if(token){
            loadCreditData()
        }
    },[token])


    const value={
        user,setUser,showLogin,setShowLogin,backendUrl,token,setToken,credit,setCredit,loadCreditData,logout,generateImage
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;