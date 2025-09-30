import React from 'react';

const NatureBackground = ({ children, className = "" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Static grass elements - no animations */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-green-400 to-green-300 opacity-20">
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-green-500 to-green-400"></div>
        {/* Static grass blades */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 bg-green-500"
            style={{
              left: `${i * 5}%`,
              width: '2px',
              height: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>

      {/* Static decorative elements - no animations */}
      <div className="absolute top-10 right-10 text-green-500 opacity-10 text-4xl">
        🌱
      </div>
      <div className="absolute top-20 left-10 text-green-500 opacity-10 text-3xl">
        🌿
      </div>
      <div className="absolute bottom-20 right-20 text-green-500 opacity-10 text-2xl">
        🍃
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default NatureBackground;
