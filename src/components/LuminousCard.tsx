import React, { useState } from 'react';
import './LuminousCard.css';

const LuminousCard = () => {
  // Toggle functionality removed, effect is now continuous

  return (
    <div className="luminous-card active">
      <div className="light-layer">
        <div className="slit"></div>
        <div className="lumen">
          <div className="min"></div>
          <div className="mid"></div>
          <div className="hi"></div>
        </div>
        <div className="darken">
          <div className="sl"></div>
          <div className="ll"></div>
          <div className="slt"></div>
          <div className="srt"></div>
        </div>
      </div>
      <div className="card-content-wrapper p-4 flex flex-col justify-end h-full"> 
        <div className="card-icon text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" className="w-32 h-32 mx-auto drop-shadow-[0_0_15px_rgba(240,86,46,0.4)]">
              {/* Logo Mark */}
              <defs>
                <linearGradient id="orange-grad" x1="0" y1="0" x2="1" y2="1">
                   <stop offset="0%" stopColor="#f0562e" />
                   <stop offset="100%" stopColor="#c03510" />
                </linearGradient>
              </defs>
              
              {/* Left Solid V Part */}
              <path d="M40 20 L20 40 L70 110 L100 70 L90 55 L70 85 L40 20 Z" fill="url(#orange-grad)" />
              {/* Decorative stripes on top left */}
              <path d="M28 35 L38 22" stroke="#1a1a1a" strokeWidth="2" />
              <path d="M32 40 L42 27" stroke="#1a1a1a" strokeWidth="2" />
              <path d="M36 45 L46 32" stroke="#1a1a1a" strokeWidth="2" />

              {/* Middle/Right Interlocking V Part */}
              <path d="M90 20 L75 40 L85 55 L100 35 Z" fill="url(#orange-grad)" /> {/* Top connector */}
              
              {/* Right Outlined V */}
              <path d="M100 70 L130 110 L180 40 L160 20 L130 65 L110 35" fill="none" stroke="url(#orange-grad)" strokeWidth="8" strokeLinejoin="round" />
              
              {/* Text: webdeveloper */}
              <text x="30" y="140" fontFamily="sans-serif" fontWeight="bold" fontSize="24" fill="url(#orange-grad)" letterSpacing="-1">web</text>
              <text x="80" y="140" fontFamily="sans-serif" fontWeight="300" fontSize="24" fill="url(#orange-grad)">developer</text>
            </svg>
        </div>
        <div className="card-bottom">
          <h4>Fullstack Architecture</h4>
          <p>Building Scalable Systems <br />With Clean & Modern Code</p>
        </div>
      </div>
    </div>
  );
};

export default LuminousCard;
