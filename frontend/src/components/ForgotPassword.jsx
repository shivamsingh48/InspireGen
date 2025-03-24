import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import LoadingButton from './LoadingButton';
import { toast } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { backendUrl, theme } = useContext(AppContext);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      const {data} = await axios.post(
        `${backendUrl}/api/v1/users/forgot-password`,
        { email },
        { withCredentials: true }
      );
        
      if (data.success) {
        setEmailSent(true);
        toast.success('Password reset link sent to your email');
      } else {
        toast.error(data.message || 'Failed to send reset link');
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`w-full max-w-md p-8 rounded-2xl shadow-lg ${
        theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'
      }`}
    >
      {!emailSent ? (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
          <p className="text-sm mb-6 text-center opacity-80">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  theme === 'dark'
                    ? 'bg-zinc-700 border-zinc-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            
            <LoadingButton
              type="submit"
              isLoading={isLoading}
              loadingText="Sending Link..."
              className="w-full py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              disabled={!email || isLoading}
            >
              Send Reset Link
            </LoadingButton>
            
            <button
              type="button"
              onClick={onBack}
              disabled={isLoading}
              className={`w-full mt-4 py-2 text-sm rounded-lg ${
                theme === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Back to Login
            </button>
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
          <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            We've sent a password reset link to <span className="font-medium text-blue-500">{email}</span>
          </p>
          <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            The link will expire in 15 minutes. If you don't see the email, check your spam folder.
          </p>
          <button
            onClick={onBack}
            className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium"
          >
            Back to Login
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ForgotPassword; 