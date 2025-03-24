import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import LoadingButton from './LoadingButton';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState('');
  const [email,setEmail]=useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { backendUrl, theme } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract token from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const resetToken = queryParams.get('token');
    const url_email=queryParams.get('email')
    if (resetToken) {
      setToken(resetToken);
    } else {
      toast.error('Invalid or missing reset token');
      navigate('/');
    }
    if(url_email){
      setEmail(url_email)
    }
    else{
      toast.error('User not authorized');
      navigate('/');
    }

  }, [location.search, navigate]);

  const validatePasswords = () => {
    if (!password) {
      toast.error('Please enter a password');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswords()) return;
    
    setIsLoading(true);
    
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/users/reset-password`, 
        { token, password,email },
        { withCredentials: true }
      );
      
      if (data.success) {
        setIsSuccess(true);
        toast.success('Password has been reset successfully');
      } else {
        toast.error(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error.status!=500 && error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-lg ${
          theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'
        }`}
      >
        {!isSuccess ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>
            <p className="text-sm mb-6 text-center opacity-80">
              Enter your new password below to update your account.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  htmlFor="password" 
                  className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    disabled={isLoading}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      theme === 'dark'
                        ? 'bg-zinc-700 border-zinc-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <button 
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Password must be at least 6 characters long
                </p>
              </div>
              
              <div>
                <label 
                  htmlFor="confirmPassword" 
                  className={`block text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={confirmPasswordVisible ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    disabled={isLoading}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      theme === 'dark'
                        ? 'bg-zinc-700 border-zinc-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <button 
                    type="button"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <LoadingButton
                type="submit"
                isLoading={isLoading}
                loadingText="Resetting Password..."
                className="w-full py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                disabled={!password || !confirmPassword || isLoading}
              >
                Reset Password
              </LoadingButton>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" stroke="#3b82f6" strokeWidth="4" fill="none"/>
                <path d="M20 32L28 40L44 24" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Password Reset Complete</h2>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Your password has been successfully updated.
            </p>
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              You can now sign in with your new password.
            </p>
            <button
              onClick={navigateToHome}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Return to Login
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword; 