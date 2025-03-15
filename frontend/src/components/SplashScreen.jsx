import React from 'react';
import Loader from './Loader';
import InspireGenLogo from './InspireGenLogo';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mb-8 w-64">
        <InspireGenLogo />
      </div>
      
      <Loader size="lg" message="Loading amazing possibilities..." />
      
      <p className="mt-16 text-gray-600 dark:text-gray-300 text-sm animate-pulse">
        Powering up your creative experience
      </p>
    </div>
  );
};

export default SplashScreen; 