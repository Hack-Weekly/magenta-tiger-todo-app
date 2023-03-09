import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth, signInWithGoogle } from '../firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { logInWithEmailAndPassword } from '../firebase/auth';

const Login = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the email and password before logging in
    if (!validateEmail(loginForm.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (!validatePassword(loginForm.password)) {
      setPasswordError(
        'Please enter a password that is at least 8 characters long.'
      );
      return;
    } else {
      setPasswordError('');
    }

    logInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const validateEmail = (email) => {
    // Use a regular expression to check if the email address is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Check if the password is at least 8 characters long
    return password.length >= 8;
  };

  return (
    <div className="bg-slate-50 max-w-sm mx-auto my-2 flex-col justify-center align-middle">
      <h2>Login to your account</h2>
      <form className="flex-col">
        <input
          name="email"
          value={loginForm.email}
          type="email"
          title="email"
          placeholder="email"
          className="bg-slate-200 pl-2 rounded-sm border border-slate-800"
          onChange={handleFormChange}
        />
        <input
          name="password"
          value={loginForm.password}
          type="password"
          title="username"
          placeholder="password"
          className="bg-slate-200 pl-2 rounded-sm border border-slate-800"
          onChange={handleFormChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
      <Link to="/register" className="underline">
        Don`t have an account?
      </Link>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
        onClick={signInWithGoogle}
      >
        Sign Up with Google
      </button>
    </div>
  );
};

export default Login;
