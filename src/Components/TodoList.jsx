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

const TodoList = ({ tasks, getTasksFromFirebase, selectedTag }) => {
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
        {selectedTag && (
          <h2 className="text-2xl font-bold first-letter:uppercase">
            {selectedTag}
          </h2>
        )}
        {selectedTag !== 'completed' && (
          <>
            <h2 className="text-xl font-bold text-light-grey">Open</h2>

            <ul className="list-disc">
              {todos
                ? todos
                    .filter((todo) => {
                      if (!selectedTag || selectedTag === 'all') {
                        return !todo.isCompleted;
                      }

                      if (selectedTag === 'favorite') {
                        return !todo.isCompleted && todo.isFavourited;
                      }

                      if (!todo.isCompleted && selectedTag === todo.tag) {
                        return !todo.isCompleted && selectedTag === todo.tag;
                      }
                    })
                    .sort((a, b) => b.date - a.date)
                    .map((todo) => {
                      return (
                        <li
                          className="list-inside flex justify-between mb-5 items-center"
                          key={todo.id}
                        >
                          <div className="flex gap-2">
                            <input
                              id={todo.name}
                              type="checkbox"
                              onChange={() => {
                                markAsCompleted(todo);
                              }}
                            />
                            <div className="flex flex-col">
                              <label
                                htmlFor={todo.name}
                                className="text-sm sm:text-base"
                              >
                                {todo.name}
                              </label>
                              <div className="flex text-xs gap-[2px] ">
                                <p className="first-letter:uppercase whitespace-nowrap">
                                  {todo.tag} <span>•</span>
                                </p>
                                <p className="text-xs text-blue ">
                                  {dateConvert(todo.date)}
                                </p>
                              </div>
                              {todo.dueDate.length !== 0 && (
                                <p className="text-xs">
                                  {formatDueDate(todo.dueDate)}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <div className="grid justify-items-end gap-[6px]">
                              <TodoEdit
                                dueDate={todo.dueDate}
                                docID={todo.docID}
                                name={todo.name}
                                getTasksFromFirebase={getTasksFromFirebase}
                                tag={todo.tag}
                              />
                              <Button
                                type="danger"
                                btnText="Delete"
                                onClick={() => handleDelete(todo.docID)}
                              />
                            </div>

                            <button
                              onClick={() => {
                                markAsFavourited(todo);
                              }}
                            >
                              {todo.isFavourited ? fullStar : hollowStar}
                            </button>
                          </div>
                        </li>
                      );
                    })
                : null}
            </ul>
          </>
        )}

        <h2 className="text-xl font-bold text-light-grey">Done</h2>
        <ul className="list-disc">
          {todos
            ? todos
                .filter((todo) => {
                  if (
                    !selectedTag ||
                    selectedTag === 'all' ||
                    selectedTag === 'completed'
                  ) {
                    return todo.isCompleted;
                  }

                  if (selectedTag === 'favorite') {
                    return todo.isCompleted && todo.isFavourited;
                  }

                  if (todo.isCompleted && selectedTag === todo.tag) {
                    return todo.isCompleted && selectedTag === todo.tag;
                  }
                })
                .sort((a, b) => b.date - a.date)
                .map((todo) => {
                  return (
                    <li
                      className="list-inside flex justify-between mb-5 items-center"
                      key={todo.id}
                    >
                      <div
                        className="flex gap-2"
                        style={{
                          textDecoration: todo.isCompleted && 'line-through',
                        }}
                      >
                        <input
                          id={todo.name}
                          type="checkbox"
                          onChange={() => {
                            markAsCompleted(todo);
                          }}
                        />
                        <div className="flex flex-col">
                          <label
                            htmlFor={todo.name}
                            className="text-sm sm:text-base"
                          >
                            {todo.name}
                          </label>
                          <div className="flex text-xs gap-[2px]">
                            <p className="first-letter:uppercase  whitespace-nowrap">
                              {todo.tag} <span>•</span>
                            </p>
                            <p className="text-xs text-blue">
                              {dateConvert(todo.date)}
                            </p>
                          </div>
                          {todo.dueDate.length !== 0 && (
                            <p>{formatDueDate(todo.dueDate)}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <div className="grid justify-items-end gap-[6px]">
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
                        </div>
                        <button
                          onClick={() => {
                            markAsFavourited(todo);
                          }}
                        >
                          {todo.isFavourited ? fullStar : hollowStar}
                        </button>
                      </div>
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
