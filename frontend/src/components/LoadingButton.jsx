import React from 'react';
import Loader from './Loader';

const LoadingButton = ({ 
  isLoading = false, 
  disabled = false,
  onClick, 
  className = '', 
  children,
  loadingText = 'Loading...' 
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center px-6 py-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed';
  
  // Default styling if no className provided
  const buttonClasses = className || 'bg-blue-600 hover:bg-blue-700 text-white';

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`${baseClasses} ${buttonClasses}`}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <Loader size="sm" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton; 