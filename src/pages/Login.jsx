import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth, getErrorMessage, signInWithGoogle } from '../firebase/auth';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '../Components/Button';
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

  const [validationError, setValidationError] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email and password before logging in
    if (!validateEmail(loginForm.email)) {
      setValidationError('Please enter a valid email address.');
      return;
    } else {
      setValidationError('');
    }

    if (!validatePassword(loginForm.password)) {
      setValidationError(
        'Please enter a password that is at least 8 characters long.'
      );
      return;
    } else {
      setValidationError('');
    }
    try {
      await logInWithEmailAndPassword(loginForm.email, loginForm.password);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
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
    <>
      <ToastContainer />
      <div className=" flex flex-col items-center justify-center min-h-screen ml-4 mr-4 mt-4">
        <div className="border-2 border-sky-500  px-8 py-6 shadow-lg rounded-lg w-full max-w-md">
          <h3 className="text-2xl font-bold text-center mb-6">
            Login to your account
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4 mb-3">
            <div>
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                title="Enter email"
                value={loginForm.email}
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block " htmlFor="password">
                Password
              </label>
              <input
                title="Enter password"
                value={loginForm.password}
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <p className="text-red-500 imp">{validationError}</p>
            <div className="flex flex-col md:flex-row justify-between">
              <Button
                btnText="Login"
                title="Login"
                className="w-full md:w-40"
              />
              <div className="flex items-center justify-center md:justify-end mt-4 md:mt-0">
                <Link
                  to="/register"
                  className="text-sm hover:underline text-black text-opacity-50"
                >
                  Don't have an account?
                  <span className="text-opacity-100 text-black">
                    {' '}
                    Create new
                  </span>
                </Link>
              </div>
            </div>
          </form>
          <Button
            btnText="Sign Up with Google"
            title="Login"
            onClick={signInWithGoogle}
            type="success"
            className="w-full mt-5"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
