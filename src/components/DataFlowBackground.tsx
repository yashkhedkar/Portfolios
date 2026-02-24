import React from 'react';
import './DataFlowBackground.css';

const DataFlowBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-30">
      <svg
        className="data-flow-svg w-full h-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Defs for gradients or markers if needed */}
        <defs>
          <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Path 1 - Large Wave */}
        <g className="flow-path-group">
          <path
            className="flow-line"
            d="M-100,200 C200,100 400,300 800,200 S1200,100 1540,300"
          />
          <circle className="flow-dot" r="3">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path="M-100,200 C200,100 400,300 800,200 S1200,100 1540,300"
            />
          </circle>
          <circle className="flow-dot" r="2" style={{ animationDelay: '-4s' }}>
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path="M-100,200 C200,100 400,300 800,200 S1200,100 1540,300"
            />
          </circle>
        </g>

        {/* Path 2 - Intersecting Curve */}
        <g className="flow-path-group" style={{ opacity: 0.7 }}>
          <path
            className="flow-line-dashed"
            d="M-100,500 C300,600 600,300 900,500 S1400,400 1540,600"
          />
          <circle className="flow-dot-secondary" r="3">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              path="M-100,500 C300,600 600,300 900,500 S1400,400 1540,600"
            />
          </circle>
        </g>

        {/* Path 3 - Subtle Background Curve */}
        <g className="flow-path-group" style={{ opacity: 0.4 }}>
           <path
            className="flow-line"
            d="M-50,700 C400,750 800,550 1200,700 S1500,650 1540,750"
          />
           <circle className="flow-dot" r="2">
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              path="M-50,700 C400,750 800,550 1200,700 S1500,650 1540,750"
            />
          </circle>
        </g>
         
         {/* Path 4 - Top Arc */}
        <g className="flow-path-group" style={{ opacity: 0.6 }}>
           <path
            className="flow-line-dashed"
            d="M-50,100 C300,0 600,200 1000,50 S1500,150 1540,50"
          />
           <circle className="flow-dot-secondary" r="2.5">
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              path="M-50,100 C300,0 600,200 1000,50 S1500,150 1540,50"
            />
          </circle>
        </g>

      </svg>
    </div>
  );
};

export default DataFlowBackground;
