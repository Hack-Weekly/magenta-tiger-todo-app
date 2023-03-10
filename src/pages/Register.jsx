import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../firebase/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/auth';

const Register = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [validationError, setValidationError] = useState('');

  const handleFormChange = async (e) => {
    const { name, value } = e.target;
    setRegisterForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the name, email & password before register
    if (!validateName(registerForm.name)) {
      setValidationError('Please enter a valid name.');
      return;
    } else {
      setValidationError('');
    }
    if (!validateEmail(registerForm.email)) {
      setValidationError('Please enter a valid email address.');
      return;
    } else {
      setValidationError('');
    }
    if (!validatePassword(registerForm.password)) {
      setValidationError(
        'Please enter a password that is at least 8 characters long.'
      );
      return;
    } else {
      setValidationError('');
    }

    try {
      await registerWithEmailAndPassword(
        registerForm.name,
        registerForm.email,
        registerForm.password
      );
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const validateName = (name) => {
    return name.length > 0;
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
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg max-w-sm m-auto mt-4 ">
        <h3 className="text-2xl font-bold text-center">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <div>
              <label className="block" htmlFor="name">
                Name
              </label>
              <input
                title="Enter name"
                value={registerForm.name}
                name="name"
                type="text"
                placeholder="Name"
                onChange={handleFormChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                title="Enter email"
                value={registerForm.email}
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleFormChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">
                Password
              </label>
              <input
                title="Enter password"
                value={registerForm.password}
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleFormChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <p className="text-red-500">{validationError}</p>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Create
              </button>
              <Link to="/login" className="text-sm hover:underline">
                Already a member? Log in
              </Link>
            </div>
          </div>
        </form>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-normal py-1 px-4 rounded mt-2"
          onClick={signInWithGoogle}
        >
          Sign Up with Google
        </button>
      </div>
    </>
  );
};

export default Register;
