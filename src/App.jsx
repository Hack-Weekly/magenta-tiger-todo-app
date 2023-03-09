import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/auth';

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    // Change in future to nice styled loader
    return (
      <div className="flex items-center justify-center mt-10">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
