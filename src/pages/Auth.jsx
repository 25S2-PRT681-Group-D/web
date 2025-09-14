import React, { useState } from 'react'

const LoginForm = ({ toggleForm }) => {
  return (
    <div className="w-full max-w-[50vw] bg-white rounded-2xl shadow-xl p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-[#36454F] mb-2">Welcome Back!</h1>
      <p className="text-center text-[#6C757D] mb-8">Log in to unlock AI-powered plant insights.</p>
      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#36454F] mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-[#36454F] mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#D95B43] text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
        >
          Log In
        </button>
      </form>
      <p className="text-center text-[#36454F] mt-8">
        Don't have an account?{' '}
        <button onClick={toggleForm} className="font-semibold text-[#00A0B0] hover:text-red-600 focus:outline-none">
          Sign Up
        </button>
      </p>
    </div>
  );
};

const SignUpForm = ({ toggleForm }) => {
  return (
    <div className="w-full max-w-[50vw] bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <h1 className="text-3xl font-bold text-center text-[#36454F] mb-2">Create Account</h1>
      <p className="text-center text-[#6C757D] mb-8">Sign up to get instant AI diagnostics for your plants.</p>
      <form className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-[#36454F] mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="e.g., Jane Doe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-[#36454F] mb-1">
            I am a ...
          </label>
          <select
            id="role"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option>Select your role</option>
            <option>Farmer</option>
            <option>Gardener</option>
            <option>Researcher</option>
            <option>Student</option>
          </select>
        </div>
        <div>
          <label htmlFor="email-signup" className="block text-sm font-semibold text-[#36454F] mb-1">
            Email
          </label>
          <input
            type="email"
            id="email-signup"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="password-signup" className="block text-sm font-semibold text-[#36454F] mb-1">
            Password
          </label>
          <input
            type="password"
            id="password-signup"
            placeholder="Minimum 8 characters"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#D95B43] text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
        >
          Create Account
        </button>
      </form>
      <p className="text-center text-gray-600 mt-8">
        Already have an account?{' '}
        <button onClick={toggleForm} className="font-semibold text-[#00A0B0] hover:text-red-600 focus:outline-none">
          Log In
        </button>
      </p>
    </div>
  );
};

const Auth = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleForm = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center font-zilla">
      {isLoginView ? <LoginForm toggleForm={toggleForm} /> : <SignUpForm toggleForm={toggleForm} />}
    </div>
  );
}

export default Auth