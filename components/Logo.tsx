import React from 'react';

interface LogoProps {
  className?: string;
  tone?: 'light' | 'dark' | 'color';
}

export const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8", tone = 'color' }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waterGradient" x1="16" y1="9" x2="16" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      
      {/* Shield Background */}
      <path 
        d="M16 30C16 30 29 23.5 29 13.5V5.5L16 1.5L3 5.5V13.5C3 23.5 16 30 16 30Z" 
        className={tone === 'light' ? 'stroke-white' : tone === 'dark' ? 'stroke-gray-900' : 'stroke-primary'}
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Water Drop */}
      <path 
        d="M16 23.5C18.7614 23.5 21 21.2614 21 18.5C21 14.5 16 9.5 16 9.5C16 9.5 11 14.5 11 18.5C11 21.2614 13.2386 23.5 16 23.5Z" 
        fill={tone === 'color' ? "url(#waterGradient)" : "currentColor"}
        stroke={tone === 'light' ? 'white' : tone === 'dark' ? 'currentColor' : 'none'}
        strokeWidth={tone === 'color' ? '0' : '1.5'}
      />
      
      {/* Shine on drop */}
      {tone === 'color' && (
        <path 
          d="M14 15C13.5 16 13.5 17.5 14.5 18.5" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeOpacity="0.6"
        />
      )}
    </svg>
  );
};
