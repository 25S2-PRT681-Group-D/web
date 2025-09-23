import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login as loginAPI } from '../api/auth.js';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import { fadeInVariants, buttonPressVariants, shakeVariants } from '../utils/animations';

const LoginForm = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await loginAPI({ email, password });
      dispatch(loginSuccess({
        user: response.user || { email, name: email },
        token: response.token
      }));
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-[50vw] bg-white rounded-2xl shadow-xl p-4 md:p-8"
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-3xl font-bold text-center text-charcoalgrey mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome Back!
      </motion.h1>
      <motion.p 
        className="text-center text-charcoalgrey mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Log in to unlock AI-powered plant insights.
      </motion.p>
      {error && (
        <motion.p 
          className="text-center text-red-600 mb-2"
          variants={shakeVariants}
          animate="animate"
        >
          {error}
        </motion.p>
      )}
      <motion.form 
        className="space-y-6" 
        onSubmit={onSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-charcoalgrey mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-charcoalgrey mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-territoryochre text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-charcoalgrey/50 disabled:opacity-60"
          variants={buttonPressVariants}
          whileHover="hover"
          whileTap="press"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </motion.button>
      </motion.form>
      <motion.p 
        className="text-center text-charcoalgrey mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Don't have an account?{' '}
        <motion.button 
          onClick={toggleForm} 
          className="font-semibold text-arafurablue hover:text-red-600 focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
        </motion.button>
      </motion.p>
    </motion.div>
  );
};

export default LoginForm;