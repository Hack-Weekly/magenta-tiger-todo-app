import { useEffect, useState } from 'react';
import {
  toggleComplete,
  deleteTask,
  toggleFavourite,
} from '../firebase/firestore';
import { Button } from './Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regFaStar } from '@fortawesome/free-regular-svg-icons';

import TodoEdit from './TodoEdit';
import dateConvert from './utilFunctions/dateConvert';

const TodoList = ({ tasks, getTasksFromFirebase }) => {
  const [todos, setTodos] = useState([]);
  const fullStar = (
    <FontAwesomeIcon icon={faStar} style={{ color: '#017bfe' }} size="lg" />
  );
  const hollowStar = (
    <FontAwesomeIcon
      icon={regFaStar}
      style={{
        color: '#017bfe',
      }}
      size="lg"
    />
  );

  useEffect(() => {
    setTodos(tasks);
  }, [tasks]);

  const markAsCompleted = async (todo) => {
    await toggleComplete(todo);
    await getTasksFromFirebase();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    await getTasksFromFirebase();
  };

  const markAsFavourited = async (todo) => {
    await toggleFavourite(todo);
    await getTasksFromFirebase();
  };

  return (
    <section>
      <div className="grid gap-2">
        <h2 className="text-xl font-bold text-slate-400">Open</h2>
        <ul className="list-disc">
          {todos
            ? todos
                .filter((todo) => !todo.isCompleted)
                .sort((a, b) => b.date - a.date)
                .map((todo) => {
                  return (
                    <li className="list-inside flex gap-2 mb-5 " key={todo.id}>
                      <input
                        type="checkbox"
                        onChange={() => {
                          markAsCompleted(todo);
                        }}
                      />
                      <div>
                        <label>{todo.name}</label>
                        <p className="text-xs">{dateConvert(todo.date)}</p>
                      </div>
                      <div>
                        <TodoEdit
                          docID={todo.docID}
                          name={todo.name}
                          getTasksFromFirebase={getTasksFromFirebase}
                        />
                      </div>
                      <Button
                        type="danger"
                        btnText="Delete"
                        onClick={() => handleDelete(todo.docID)}
                      />
                      {todo.isFavourited ? (
                        <button
                          onClick={() => {
                            markAsFavourited(todo);
                          }}
                        >
                          {fullStar}
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            markAsFavourited(todo);
                          }}
                        >
                          {hollowStar}
                        </button>
                      )}
                    </li>
                  );
                })
            : null}
        </ul>

        <h2 className="text-xl font-bold text-slate-400">Done</h2>
        <ul className="list-disc">
          {todos
            ? todos
                .filter((todo) => todo.isCompleted)
                .sort((a, b) => b.date - a.date)
                .map((todo) => {
                  return (
                    <li className="list-inside flex gap-2 mb-5" key={todo.id}>
                      <input
                        type="checkbox"
                        onChange={() => {
                          markAsCompleted(todo);
                        }}
                      />
                      <div>
                        <label
                          style={{
                            textDecoration: todo.isCompleted && 'line-through',
                          }}
                        >
                          {todo.name}
                        </label>
                        <p
                          style={{
                            textDecoration: todo.isCompleted && 'line-through',
                          }}
                          className="text-xs"
                        >
                          {dateConvert(todo.date)}
                        </p>
                      </div>
                      <TodoEdit
                        docID={todo.docID}
                        name={todo.name}
                        getTasksFromFirebase={getTasksFromFirebase}
                      />
                      <Button
                        type="danger"
                        btnText="Delete"
                        onClick={() => handleDelete(todo.docID)}
                      />
                      {todo.isFavourited ? (
                        <button
                          onClick={() => {
                            markAsFavourited(todo);
                          }}
                        >
                          {fullStar}
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            markAsFavourited(todo);
                          }}
                        >
                          {hollowStar}
                        </button>
                      )}
                    </li>
                  );
                })
            : null}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
