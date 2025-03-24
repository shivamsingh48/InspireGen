import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google'
import { Eye, EyeOff } from "lucide-react";
import LoadingButton from './LoadingButton';
import Loader from './Loader';
import ForgotPassword from './ForgotPassword';

const Login = () => {

    const [state, setState] = useState('Login');
    const { showLogin, setShowLogin, backendUrl, token, setToken, setUser, setProfile, theme } = useContext(AppContext)

    const [fullName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const validateInputs = () => {
        const validationErrors = {};

        if (!email.trim()) {
            validationErrors.email = "Email is required";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            validationErrors.email = "Invalid email format";
        }

        if (!password.trim()) {
            validationErrors.password = "Password is required";
        } else if (password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters long";
        }

        return validationErrors;
    };

    const responseGoogle = async (authResult) => {
        try {
            setIsGoogleLoading(true);
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
            toast.error("Google authentication failed. Please try again.");
        } finally {
            setIsGoogleLoading(false);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setIsLoading(true);

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
                    toast.success("Account created successfully! Please log in.")
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleForgotPassword = () => {
        if (!isLoading) {
            setShowForgotPassword(true);
        }
    };

    const handleBackToLogin = () => {
        setShowForgotPassword(false);
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <div className='fixed left-0 right-0 top-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            {showForgotPassword ? (
                <ForgotPassword onBack={handleBackToLogin} />
            ) : (
                <motion.form onSubmit={onSubmitHandler}
                    initial={{ opacity: 0.2, y: 50 }}
                    transition={{ duration: 0.3 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative p-10 rounded-xl ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-slate-500'}`}>
                    <h1 className={`text-center text-2xl font-medium ${theme === 'dark' ? 'text-white' : 'text-neutral-700'}`}>{state}</h1>
                    <p>Welcome back! Please sign in to continue</p>
                    {isGoogleLoading ? (
                        <div className={`flex items-center mt-2 justify-center gap-2 w-full py-2 rounded-full shadow-sm ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-600 border border-gray-300'}`}>
                            <Loader size="sm" />
                            <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>Connecting with Google...</span>
                        </div>
                    ) : (
                        <button
                            onClick={googleLogin}
                            type="button"
                            className={`flex items-center mt-2 justify-center gap-2 w-full py-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-600 border border-gray-300'}`}
                        >
                            <img
                                src={assets.google_icon}
                                alt="Google Logo"
                                className="w-5 h-5"
                            />
                            <span className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>Sign in with Google</span>
                        </button>
                    )}
                    {state !== 'Login' && <div className={`border px-5 py-2 flex items-center gap-2 rounded-full mt-4 ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'}`}>
                        <img src={assets.profile_icon} className='w-5' alt="" />
                        <input
                            type="text"
                            className={`outline-none text-sm w-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
                            onChange={(e) => setName(e.target.value)}
                            value={fullName}
                            placeholder='Full Name'
                            required
                            disabled={isLoading}
                        />
                    </div>
                    }
                    <div className={`border px-6 py-2 flex items-center gap-2 rounded-full mt-5 ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'}`}>
                        <img src={assets.email_icon} alt="" />
                        <input
                            type="email"
                            className={`outline-none text-sm w-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder='Email id'
                            required
                            disabled={isLoading}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                    <div className={`border px-6 py-2 flex items-center gap-2 rounded-full mt-4 relative ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'}`}>
                        <img src={assets.lock_icon} alt="" />
                        <input
                            type={passwordVisible ? "text" : "password"}
                            className={`outline-none text-sm w-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder='Password'
                            required
                            disabled={isLoading}
                        />
                        <span
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className='absolute right-3 cursor-pointer text-gray-500'
                        >
                            {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-xs">{errors.password}</p>
                    )}
                    {state === 'Login' && (
                        <p 
                            onClick={handleForgotPassword}
                            className={`text-sm text-blue-600 my-4 cursor-pointer ml-4 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            Forgot password?
                        </p>
                    )}

                    <LoadingButton
                        isLoading={isLoading}
                        loadingText={state === 'Login' ? 'Logging in...' : 'Creating account...'}
                        className='bg-blue-600 w-full text-white py-2 rounded-full hover:bg-blue-700 transition-colors'
                    >
                        {state === 'Login' ? 'Login' : 'Create account'}
                    </LoadingButton>

                    {state !== 'Login' ? (
                        <p className='mt-5 text-center'>Already have an account?
                            <span 
                                className='text-blue-600 cursor-pointer ml-1' 
                                onClick={() => !isLoading && setState('Login')}
                            >
                                Login
                            </span>
                        </p>
                    ) : (
                        <p className='mt-5 text-center'>Don't have an account?
                            <span 
                                className='text-blue-600 cursor-pointer ml-1'
                                onClick={() => !isLoading && setState('Sign Up')}
                            >
                                Sign up
                            </span>
                        </p>
                    )}

                    <img 
                        onClick={() => !isLoading && setShowLogin(false)} 
                        src={assets.cross_icon} 
                        alt="Close" 
                        className={`absolute top-5 right-5 cursor-pointer ${isLoading ? 'opacity-50' : ''}`} 
                    />
                </motion.form>
            )}
        </div>
    )
}

export default Login