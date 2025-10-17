import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { scaleInVariants } from '../utils/animations';

function SummaryCard({ title, value, icon = "📊" }) {
  return (
    <motion.div 
      className='bg-white w-full p-8 flex flex-col items-start justify-start gap-4 rounded-lg shadow-lg shadow-charcoalgrey/50 cursor-pointer'
      variants={scaleInVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.span 
          className="text-3xl"
          animate={{ rotate: [0, 30, 0, -30, 0] }}
          transition={{ duration: 1, repeat: 1, repeatType: 'reverse' }}
        >
          {icon}
        </motion.span>
        <p className='text-charcoalgrey text-2xl font-bold'>
          {title}
        </p>
      </motion.div>
      <motion.p 
        className='text-savannagreen text-3xl font-semibold'
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
}

export default SummaryCard;