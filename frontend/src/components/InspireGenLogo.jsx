import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const InspireGenLogo = ({ className = '', themeOverride = null }) => {
  // Allow theme override or use context
  const context = useContext(AppContext);
  const theme = themeOverride || (context ? context.theme : 'light');
  
  // Colors based on theme
  const primaryColor = theme === 'dark' ? '#60a5fa' : '#3b82f6'; // blue-400 in dark, blue-500 in light
  const secondaryColor = theme === 'dark' ? '#f97316' : '#ea580c'; // orange-500 in dark, orange-600 in light
  const textColor = theme === 'dark' ? '#f9fafb' : '#1f2937'; // gray-50 in dark, gray-800 in light
  
  return (
    <svg
      className={className}
      viewBox="0 0 260 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lightbulb/idea icon */}
      <g transform="translate(8, 10) scale(1.0)">
        <path
          d="M30 10c-11.03 0-20 8.97-20 20 0 7.03 3.67 13.5 9.62 17.16v4.84c0 1.1.9 2 2 2h2c.55 0 .99-.45.99-1h4c0 .55.45 1 1.01 1h2c1.1 0 2-.9 2-2v-4.84c5.95-3.66 9.62-10.14 9.62-17.16 0-11.03-8.97-20-20-20zm-3.01 36v-2.99h6v2.99h-6zm7.01-7.44V36h-8v2.56c-4.19-2.72-7-7.4-7-12.56 0-8.28 6.72-15 15-15s15 6.72 15 15c0 5.16-2.81 9.84-7 12.56z"
          fill={primaryColor}
        />
        <path
          d="M23 24V21h-2V24h-3v2h3v3h2v-3h3v-2z"
          fill={secondaryColor}
        />
      </g>

      {/* Text "Inspire" */}
      <text
        x="65"
        y="38"
        fontFamily="Arial, sans-serif"
        fontSize="26"
        fontWeight="bold"
        fill={textColor}
      >
        Inspire
      </text>

      {/* Text "Gen" with gradient */}
      <text
        x="155"
        y="38"
        fontFamily="Arial, sans-serif"
        fontSize="26"
        fontWeight="bold"
        fill={secondaryColor}
      >
        Gen
      </text>

      {/* Decorative elements - rays or sparks */}
      <g transform="translate(50, 35)">
        {[15, 30, 45, 60, 75, 90].map((angle, i) => (
          <path
            key={i}
            d={`M0 0 L${Math.cos(angle * Math.PI / 180) * 12} ${Math.sin(angle * Math.PI / 180) * 12}`}
            stroke={i % 2 ? primaryColor : secondaryColor}
            strokeWidth="2.5"
          />
        ))}
      </g>

      {/* Tagline */}
      <text
        x="65"
        y="53"
        fontFamily="Arial, sans-serif"
        fontSize="12"
        fill={textColor}
        opacity="0.8"
      >
        Turn text to image, in seconds
      </text>
    </svg>
  );
};

export default InspireGenLogo; 