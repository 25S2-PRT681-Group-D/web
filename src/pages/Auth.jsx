import React, { useState } from 'react'
import { LoginForm, SignUpForm } from '../components';

const Auth = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleForm = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center flex-1">
      {isLoginView ? <LoginForm toggleForm={toggleForm} /> : <SignUpForm toggleForm={toggleForm} />}
    </div>
  );
}

export default Auth