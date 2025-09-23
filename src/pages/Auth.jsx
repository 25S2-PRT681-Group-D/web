import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LoginForm, SignUpForm } from '../components';
import { pageTransitionVariants, slideUpVariants } from '../utils/animations';

const Auth = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleForm = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <motion.div 
      className="w-full flex flex-col items-center justify-center flex-1"
      variants={pageTransitionVariants}
      initial="initial"
      animate="in"
      exit="out"
    >
      <AnimatePresence mode="wait">
        {isLoginView ? (
          <motion.div
            key="login"
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <LoginForm toggleForm={toggleForm} />
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <SignUpForm toggleForm={toggleForm} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Auth