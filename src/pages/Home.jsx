import TodoForm from '../Components/TodoForm';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, logout } from '../firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getTasks } from '../firebase/firestore';

const Home = () => {
  const [user] = useAuthState(auth);
  const [userID, setUserID] = useState(null);
  const [tasks, setTasks] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token');

    if (authToken) {
      navigate('/');
    }

    if (!authToken) {
      navigate('/login');
    }
  }, []);

  const getTasksFromFirebase = async (id) => {
    const tasks = await getTasks(id);
    if (tasks) {
      setTasks(tasks);
    } else if (!tasks) {
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user) {
      setUserID(user.uid);
      getTasksFromFirebase(user.uid);
    }
  }, [user]);

  return (
    <>
      <TodoForm
        userUID={userID}
        tasks={tasks}
        getTasksFromFirebase={getTasksFromFirebase}
      />
      <button onClick={logout}>Log Out</button>
    </>
  );
};

export default Home;
