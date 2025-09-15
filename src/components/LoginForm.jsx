const LoginForm = ({ toggleForm }) => {
  return (
    <div className="w-full max-w-[50vw] bg-white rounded-2xl shadow-xl p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-charcoalgrey mb-2">Welcome Back!</h1>
      <p className="text-center text-charcoalgrey mb-8">Log in to unlock AI-powered plant insights.</p>
      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-charcoalgrey mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-white rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-charcoalgrey mb-1">
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
          className="w-full bg-territoryochre text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
        >
          Log In
        </button>
      </form>
      <p className="text-center text-charcoalgrey mt-8">
        Don't have an account?{' '}
        <button onClick={toggleForm} className="font-semibold text-arafurablue hover:text-red-600 focus:outline-none">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;