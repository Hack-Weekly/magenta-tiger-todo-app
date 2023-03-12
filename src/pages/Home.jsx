import { Button } from '../Components/Button';
import Nav from '../Components/Nav';
import TodoForm from '../Components/TodoForm';
import TodoList from '../Components/TodoList';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../firebase/auth';
import { getTasks } from '../firebase/firestore';

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userID, setUserID] = useState(null);
  const [tasks, setTasks] = useState(null);
  console.log(tasks);

  const navigate = useNavigate();

  const getTasksFromFirebase = async () => {
    if (user) {
      const fetchedTasks = await getTasks(user.uid);
      if (fetchedTasks) {
        setTasks(fetchedTasks);
      } else {
        return null;
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (user) {
      setUserID(user.uid);
      getTasksFromFirebase();
    }
  }, [user]);

  return (
    // change styling as appropriate//
    <div className="flex items-center gap-10 justify-between">
      <Nav tasks={tasks} />
      <main>
        <TodoForm
          userUID={userID}
          getTasksFromFirebase={getTasksFromFirebase}
        />
        <TodoList tasks={tasks} getTasksFromFirebase={getTasksFromFirebase} />
        <Button onClick={logout} type="danger" btnText="Log out" />
      </main>
    </div>
  );
};

export default Home;
