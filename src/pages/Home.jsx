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
  const [selectedTag, setSelectedTag] = useState('');

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
    <div className="relative h-screen overflow-x-hidden  md:grid md:grid-cols-[auto,1fr] md:gap-5">
      <Nav tasks={tasks} onSelectedTag={setSelectedTag} />
      <main>
        <TodoForm
          userUID={userID}
          getTasksFromFirebase={getTasksFromFirebase}
        />
        <div className="px-5 mt-8 mb-5  md:max-w-3xl">
          <TodoList
            tasks={tasks}
            getTasksFromFirebase={getTasksFromFirebase}
            selectedTag={selectedTag}
          />
          <Button onClick={logout} type="danger" btnText="Log out" />
        </div>
      </main>
    </div>
  );
};

export default Home;
