import React from 'react';
import { motion } from 'framer-motion';

const NatureBackground = ({ children, className = "" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Grass elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-green-400 to-green-300 opacity-30">
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-green-500 to-green-400"></div>
        {/* Grass blades */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 bg-green-500"
            style={{
              left: `${i * 5}%`,
              width: '2px',
              height: `${Math.random() * 20 + 10}px`,
              transformOrigin: 'bottom',
            }}
            animate={{
              rotate: [0, Math.random() * 10 - 5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Floating leaves */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-500 opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          🍃
        </motion.div>
      ))}

      {/* Floating fruits */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-15"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 15 + 15}px`,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, Math.random() * 15 - 7.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {['🍎', '🍊', '🍇', '🍓', '🥕'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}

      {/* Flowers */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 12 + 8}px`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          {['🌸', '🌺', '🌻', '🌼', '🌷', '🌹'][Math.floor(Math.random() * 6)]}
        </motion.div>
      ))}

      {/* Trees */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 opacity-15"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 30 + 20}px`,
          }}
          animate={{
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          🌳
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default NatureBackground;
