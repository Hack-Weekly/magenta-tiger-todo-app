import { useEffect, useState } from 'react';
import {
  deleteTask,
  toggleComplete,
  toggleFavourite,
} from '../firebase/firestore';
import { Button } from './Button';
import { fullStar, hollowStar } from './icons/icon';
import TodoEdit from './TodoEdit';
import dateConvert, { formatDueDate } from './utilFunctions/dateConvert';

const TodoList = ({ tasks, getTasksFromFirebase }) => {
  const [todos, setTodos] = useState([]);

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
                        <p>{todo.tag}</p>
                        <p className="text-xs">{dateConvert(todo.date)}</p>
                        {todo.dueDate.length !== 0 && (
                          <p>{formatDueDate(todo.dueDate)}</p>
                        )}
                      </div>

                      <div>
                        <TodoEdit
                          dueDate={todo.dueDate}
                          docID={todo.docID}
                          name={todo.name}
                          getTasksFromFirebase={getTasksFromFirebase}
                          tag={todo.tag}
                        />
                      </div>
                      <Button
                        type="danger"
                        btnText="Delete"
                        onClick={() => handleDelete(todo.docID)}
                      />
                      <button
                        onClick={() => {
                          markAsFavourited(todo);
                        }}
                      >
                        {todo.isFavourited ? fullStar : hollowStar}
                      </button>
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
                        >
                          {todo.tag}
                        </p>

                        <p
                          style={{
                            textDecoration: todo.isCompleted && 'line-through',
                          }}
                          className="text-xs"
                        >
                          {dateConvert(todo.date)}
                        </p>
                        {todo.dueDate.length !== 0 && (
                          <p
                            style={{
                              textDecoration:
                                todo.isCompleted && 'line-through',
                            }}
                          >
                            {formatDueDate(todo.dueDate)}
                          </p>
                        )}
                      </div>
                      <TodoEdit
                        docID={todo.docID}
                        name={todo.name}
                        getTasksFromFirebase={getTasksFromFirebase}
                        dueDate={todo.dueDate}
                        tag={todo.tag}
                      />
                      <Button
                        type="danger"
                        btnText="Delete"
                        onClick={() => handleDelete(todo.docID)}
                      />
                      <button
                        onClick={() => {
                          markAsFavourited(todo);
                        }}
                      >
                        {todo.isFavourited ? fullStar : hollowStar}
                      </button>
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
