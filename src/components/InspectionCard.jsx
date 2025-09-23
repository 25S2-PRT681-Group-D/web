import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cardHoverVariants, scaleInVariants } from '../utils/animations';

function InspectionCard({ plantName, date, status, statusType, bgColor, inspectionId }) {
  const statusClassName = statusType === 'healthy' ? 'text-savannagreen bg-savannagreen/10' : 'text-territoryochre bg-territoryochre/10';
  const navigate = useNavigate();

  return (
    <motion.button
      className='bg-white w-full flex flex-col items-center rounded-lg shadow-lg shadow-charcoalgrey/50'
      onClick={() => { navigate(`/analysis/${inspectionId}`) }}
      variants={scaleInVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="press"
    >
      <motion.div 
        className={`${bgColor} w-full h-[200px] flex items-center justify-center rounded-t-lg`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <motion.h3 
          className='text-4xl text-cloudwhite font-semibold'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {plantName}
        </motion.h3>
      </motion.div>
      <motion.div 
        className='w-full p-6 flex flex-col items-start justify-start gap-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.h3 
          className='text-3xl text-charcoalgrey font-semibold'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {plantName}
        </motion.h3>
        <motion.p 
          className='text-base text-charcoalgrey font-medium'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          {date}
        </motion.p>
        <motion.span 
          className={`text-base font-bold px-2 py-1 rounded-lg ${statusClassName}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        >
          {status}
        </motion.span>
      </motion.div>
    </motion.button>
  );
}

export default InspectionCard;