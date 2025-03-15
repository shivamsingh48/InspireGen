import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Loader = ({ size = 'md', fullScreen = false, message = '' }) => {
  const context = useContext(AppContext);
  const theme = context ? context.theme : 'light';
  
  // Colors from your branding
  const primaryColor = theme === 'dark' ? '#60a5fa' : '#3b82f6'; // blue-400/500
  const secondaryColor = theme === 'dark' ? '#f97316' : '#ea580c'; // orange-500/600
  const textColor = theme === 'dark' ? '#f9fafb' : '#1f2937'; // gray-50/800
  
  // Size mapping
  const sizeMap = {
    sm: { container: 'w-6 h-6', outer: 40, inner: 18 },
    md: { container: 'w-12 h-12', outer: 60, inner: 28 },
    lg: { container: 'w-20 h-20', outer: 80, inner: 36 }
  };
  
  const selectedSize = sizeMap[size] || sizeMap.md;
  
  return (
    <div className={`flex flex-col items-center justify-center ${fullScreen ? 'fixed inset-0 z-50 bg-opacity-70 bg-white dark:bg-gray-900 dark:bg-opacity-70' : ''}`}>
      <div className={`relative ${selectedSize.container}`}>
        {/* Outer spinning circle */}
        <svg className="animate-spin" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r={selectedSize.outer / 2} 
            fill="none" 
            strokeWidth="8"
            stroke={primaryColor} 
            strokeDasharray="180 300"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Inner pulsing lightbulb */}
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <svg 
            width={selectedSize.inner} 
            height={selectedSize.inner} 
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7zM9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9v1z"
              fill={secondaryColor}
            />
          </svg>
        </div>
      </div>
      
      {/* Optional loading message */}
      {message && (
        <div className="mt-4 text-center">
          <p className="text-sm font-medium" style={{ color: textColor }}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default Loader; 