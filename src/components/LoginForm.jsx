import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login as loginAPI } from '../api/auth.js';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';

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
    <div className="w-full max-w-[50vw] bg-white rounded-2xl shadow-xl p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-charcoalgrey mb-2">Welcome Back!</h1>
      <p className="text-center text-charcoalgrey mb-4">Log in to unlock AI-powered plant insights.</p>
      {error && <p className="text-center text-red-600 mb-2">{error}</p>}
      <form className="space-y-6" onSubmit={onSubmit}>
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
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-territoryochre text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-charcoalgrey/50 disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <p className="text-center text-charcoalgrey mt-6">
        Don't have an account?{' '}
        <button onClick={toggleForm} className="font-semibold text-arafurablue hover:text-red-600 focus:outline-none">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;