import TodoForm from '../Components/TodoForm';
import TodoList from '../Components/TodoList';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, logout } from '../firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getTasks } from '../firebase/firestore';

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userID, setUserID] = useState(null);
  const [tasks, setTasks] = useState(null);

  const navigate = useNavigate();

  const getTasksFromFirebase = async (id) => {
    const tasks = await getTasks(id);
    if (tasks) {
      setTasks(tasks);
    } else if (!tasks) {
      return null;
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (user) {
      setUserID(user.uid);
      getTasksFromFirebase(user.uid);
    }
  }, [user]);

  return (
    <>
      <TodoForm userUID={userID} getTasksFromFirebase={getTasksFromFirebase} />
      <TodoList tasks={tasks} />
      <button
        onClick={logout}
        className="rounded-md bg-red-500 text-white px-4"
      >
        Log Out
      </button>
    </>
  );
};

export default Home;
