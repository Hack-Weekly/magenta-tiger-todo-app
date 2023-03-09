import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../firebase/auth';

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

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the name, email & password before register

    if (!validateName(registerForm.name)) {
      setNameError('Name should be at least 1 character long.');
      return;
    } else {
      setNameError('');
    }

    if (!validateEmail(registerForm.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (!validatePassword(registerForm.password)) {
      setPasswordError(
        'Please enter a password that is at least 8 characters long.'
      );
      return;
    } else {
      setPasswordError('');
    }

    registerWithEmailAndPassword(
      registerForm.name,
      registerForm.email,
      registerForm.password
    );
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
    <div className="bg-slate-50 max-w-sm mx-auto my-2 flex-col justify-center align-middle">
      <h2>Register account</h2>
      <form className="flex-col">
        <input
          name="name"
          value={registerForm.name}
          type="text"
          title="name"
          placeholder="name"
          className="bg-slate-200 pl-2 rounded-sm border border-slate-800"
          onChange={handleFormChange}
        />
        <input
          name="email"
          value={registerForm.email}
          type="email"
          title="email"
          placeholder="email"
          className="bg-slate-200 pl-2 rounded-sm border border-slate-800"
          onChange={handleFormChange}
        />
        <input
          name="password"
          value={registerForm.password}
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
          Register
        </button>
      </form>
      <Link to="/login" className="underline">
        Already have an account?
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

export default Register;
