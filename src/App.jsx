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
    // Change in future to styled loader
    return <div>Loading...</div>;
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
