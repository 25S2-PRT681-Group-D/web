import React from 'react';
import { motion } from 'framer-motion';
import { cardHoverVariants, scaleInVariants } from '../utils/animations';

function SummaryCard({ title, value }) {
  return (
    <motion.div 
      className='bg-white w-full p-8 flex flex-col items-start justify-start gap-4 rounded-lg shadow-lg shadow-charcoalgrey/50 cursor-pointer'
      variants={scaleInVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.p 
        className='text-charcoalgrey text-2xl font-bold'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.p>
      <motion.p 
        className='text-savannagreen text-3xl font-semibold'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
}

export default SummaryCard;