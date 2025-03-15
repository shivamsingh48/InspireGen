import React, { useEffect } from 'react';

// A simple component that adds a static favicon to your app
const StaticFavicon = () => {
  useEffect(() => {
    // Create a static SVG favicon - using the light theme colors for consistency
    const faviconSVG = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="6" fill="#ffffff" />
        <g transform="translate(6, 4) scale(0.6)">
          <path d="M30 10c-11.03 0-20 8.97-20 20 0 7.03 3.67 13.5 9.62 17.16v4.84c0 1.1.9 2 2 2h2c.55 0 .99-.45.99-1h4c0 .55.45 1 1.01 1h2c1.1 0 2-.9 2-2v-4.84c5.95-3.66 9.62-10.14 9.62-17.16 0-11.03-8.97-20-20-20zm-3.01 36v-2.99h6v2.99h-6zm7.01-7.44V36h-8v2.56c-4.19-2.72-7-7.4-7-12.56 0-8.28 6.72-15 15-15s15 6.72 15 15c0 5.16-2.81 9.84-7 12.56z" fill="#3b82f6" />
          <path d="M23 24V21h-2V24h-3v2h3v3h2v-3h3v-2z" fill="#ea580c" />
        </g>
        <text x="16" y="26" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#ea580c" text-anchor="middle">IG</text>
      </svg>
    `;
    
    try {
      // Convert SVG to data URL
      const encodedSvg = encodeURIComponent(faviconSVG);
      const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
      
      // Find existing favicon or create a new one
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/svg+xml';
      link.rel = 'shortcut icon';
      link.href = dataUrl;
      
      // Add to document head if not already there
      if (!document.querySelector("link[rel*='icon']")) {
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    } catch (error) {
      console.error("Error setting favicon:", error);
    }
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default StaticFavicon; 