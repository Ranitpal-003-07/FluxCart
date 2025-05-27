import React from "react";

const Logo = ({ width = 180, height = 180 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="fluxGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#A84FF6" />
          <stop offset="100%" stopColor="#32E0FC" />
        </linearGradient>

        <filter id="fluxGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Cart + chart line */}
      <path
        d="
          M60 150 
          L70 190 
          H170 
          C180 190, 180 160, 200 170 
          C210 175, 220 150, 240 160"
        stroke="url(#fluxGradient)"
        strokeWidth="8"
        fill="none"
        filter="url(#fluxGlow)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Wheels */}
      <circle cx="80" cy="200" r="10" fill="#4F46E5" />
      <circle cx="140" cy="200" r="10" fill="#4F46E5" />

      {/* Title */}
      <text
        x="50%"
        y="260"
        fontFamily="Segoe UI, sans-serif"
        fontSize="28"
        fill="#ffffff"
        textAnchor="middle"
        style={{
          fontWeight: 600,
          filter: "drop-shadow(0 0 2px rgba(79,70,229,0.8))",
        }}
      >
        Flux Cart
      </text>
    </svg>
  );
};

export default Logo;
