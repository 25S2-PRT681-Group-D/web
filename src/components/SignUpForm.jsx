import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register as registerAPI } from '../api/auth.js';
import { registerStart, registerSuccess, registerFailure } from '../store/authSlice';

const SignUpForm = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    try {
      const response = await registerAPI({ firstName, lastName, role, email, password });
      dispatch(registerSuccess({
        user: response.user || { email, firstName, lastName, role },
        token: response.token
      }));
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      const errorMessage = err.message || 'Sign up failed';
      dispatch(registerFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <h1 className="text-3xl font-bold text-center text-charcoalgrey mb-2">Create Account</h1>
      <p className="text-center text-charcoalgrey mb-8">Sign up to get instant AI diagnostics for your plants.</p>
      {error && <p className="text-center text-red-600 mb-2">{error}</p>}
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-charcoalgrey mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g., Jane"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-charcoalgrey mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g., Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-charcoalgrey mb-1">
            I am a ...
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-charcoalgrey"
            required
          >
            <option value="">Select your role</option>
            <option value="Farmer">Farmer</option>
            <option value="Gardener">Gardener</option>
            <option value="Researcher">Researcher</option>
            <option value="Student">Student</option>
          </select>
        </div>
        <div>
          <label htmlFor="email-signup" className="block text-sm font-semibold text-charcoalgrey mb-1">
            Email
          </label>
          <input
            type="email"
            id="email-signup"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="password-signup" className="block text-sm font-semibold text-charcoalgrey mb-1">
            Password
          </label>
          <input
            type="password"
            id="password-signup"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-territoryochre text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-charcoalgrey/50 disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
      <p className="text-center text-gray-600 mt-8">
        Already have an account?{' '}
        <button onClick={toggleForm} className="font-semibold text-arafurablue hover:text-red-600 focus:outline-none">
          Log In
        </button>
      </p>
    </div>
  );
};

export default SignUpForm;