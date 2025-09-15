const SignUpForm = ({ toggleForm }) => {
  return (
    <div className="w-full max-w-[50vw] bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <h1 className="text-3xl font-bold text-center text-charcoalgrey mb-2">Create Account</h1>
      <p className="text-center text-charcoalgrey mb-8">Sign up to get instant AI diagnostics for your plants.</p>
      <form className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-charcoalgrey mb-1">
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
          <label htmlFor="role" className="block text-sm font-semibold text-charcoalgrey mb-1">
            I am a ...
          </label>
          <select
            id="role"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-charcoalgrey"
          >
            <option>Select your role</option>
            <option>Farmer</option>
            <option>Gardener</option>
            <option>Researcher</option>
            <option>Student</option>
          </select>
        </div>
        <div>
          <label htmlFor="email-signup" className="block text-sm font-semibold text-charcoalgrey mb-1">
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
          <label htmlFor="password-signup" className="block text-sm font-semibold text-charcoalgrey mb-1">
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
          className="w-full bg-territoryochre text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
        >
          Create Account
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