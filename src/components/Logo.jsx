import React from 'react';
import '../styles/Logo.css';

/**
 * NutriCare AI Logo Component
 * Shield shape with leaf and heart, navy and green colors
 */
const Logo = ({ size = 'medium' }) => {
  return (
    <div className={`logo-wrapper logo-${size}`}>
      <svg
        viewBox="0 0 100 120"
        className="logo-svg"
        aria-label="NutriCare AI Logo"
        role="img"
      >
        {/* Shield background */}
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1e3a8a', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Main shield shape */}
        <path
          d="M 50 10 L 80 25 L 80 60 C 80 85 50 105 50 105 C 50 105 20 85 20 60 L 20 25 Z"
          fill="url(#shieldGradient)"
          stroke="#ffffff"
          strokeWidth="2"
        />

        {/* Leaf (left side) */}
        <g transform="translate(35, 50)">
          <ellipse cx="0" cy="0" rx="6" ry="12" fill="#22c55e" transform="rotate(-25)" />
          <path
            d="M -3 -10 Q -5 -5 -3 0 Q 0 5 3 0 Q 5 -5 3 -10"
            fill="#16a34a"
            opacity="0.6"
          />
        </g>

        {/* Heart (right side) */}
        <g transform="translate(65, 50)">
          <path
            d="M 0 -2 
             C -3 -5 -8 -5 -8 -2
             C -8 2 -2 6 0 9
             C 2 6 8 2 8 -2
             C 8 -5 3 -5 0 -2 Z"
            fill="#ef4444"
          />
        </g>
      </svg>
      <span className="logo-text">NutriCare AI</span>
    </div>
  );
};

export default Logo;
