import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google'

const Login = () => {

    const [state, setState] = useState('Login');
    const { showLogin, setShowLogin, backendUrl, token, setToken, setUser, setProfile } = useContext(AppContext)

    const [fullName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const responseGoogle = async (authResult) => {
        try {
            if (authResult['code']) {
                const result = await axios.get(`${backendUrl}/api/v1/users/google?code=${authResult['code']}`, {
                    withCredentials: true
                })
                const userInfo = result.data
                if (userInfo.success) {
                    setToken(userInfo.data.accessToken)
                    setShowLogin(false)
                    setUser(userInfo.data.user)
                    setProfile(userInfo.data.user.avatar)
                }
            }

        } catch (error) {
            console.log("error with requesting google: ", error);

        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === 'Login') {
                const response = await axios.post(`${backendUrl}/api/v1/users/login`,
                    { email, password }, { withCredentials: true }
                )
                const userInfo = response.data
                if (userInfo.success) {
                    setToken(userInfo.data.accessToken)
                    setShowLogin(false)
                    setUser(userInfo.data.user)
                }

            }
            else {
                const response = await axios.post(`${backendUrl}/api/v1/users/signup`,
                    { fullName, email, password }
                )
                const userInfo = response.data

                if (userInfo.success) {
                    setState('Login')
                    setUser(userInfo.data.user)
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <div className='fixed left-0 right-0 top-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

            <motion.form onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
                <p>Welcome back! Please sign in to continue</p>
                <button
                    onClick={googleLogin}
                    className="flex items-center mt-2 justify-center gap-2 w-full bg-white border border-gray-300 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                    <img
                        src={assets.google_icon}
                        alt="Google Logo"
                        className="w-5 h-5"
                    />
                    <span className="text-gray-600 font-medium">Sign in with Google</span>
                </button>
                {state !== 'Login' && <div className='border px-5 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.profile_icon} className='w-5' alt="" />
                    <input
                        type="text"
                        className='outline-none text-sm'
                        onChange={(e) => setName(e.target.value)}
                        value={fullName}
                        placeholder='Full Name'
                        required
                    />
                </div>

                }
                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img src={assets.email_icon} alt="" />
                    <input
                        type="email"
                        className='outline-none text-sm'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder='Email id'
                        required
                    />
                </div>
                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt="" />
                    <input
                        type="password"
                        className='outline-none text-sm'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder='Password'
                        required
                    />
                </div>

                <p className='text-sm text-blue-600 my-4 cursor-pointer ml-4'> Forgot password? </p>

                <button
                    className='bg-blue-600 w-full text-white py-2 rounded-full'
                >{state === 'Login' ? 'login' : 'create account'}</button>



                {state !== 'Login' ? <p className='mt-5 text-center'>Already have an account?
                    <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span>
                </p>
                    :
                    <p className='mt-5 text-center'>Don't have an account?
                        <span className='text-blue-600 cursor-pointer'
                            onClick={() => setState('Sign Up')}
                        >Sign up</span>
                    </p>
                }

                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />

            </motion.form>

        </div>
    )
}

export default Login