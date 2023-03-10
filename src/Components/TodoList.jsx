import { useEffect, useState } from "react";
import TodoEdit from "./TodoEdit";
import dateConvert from "./utilFunctions/dateConvert";

const TodoList = ({ tasks, getTasksFromFirebase }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(tasks);
  }, [tasks]);

  return (
    <section>
      <div className="grid gap-4">
        <h2 className="text-xl font-bold text-slate-400">Open</h2>
        <ul className="list-disc">
          {todos
            ? todos
                .filter((todo) => !todo.isCompleted)
                .sort((a, b) => b.date - a.date)
                .map((todo) => {
                  return (
                    <li className="list-inside flex gap-2 mb-5" key={todo.id}>
                      <input type="checkbox" />
                      <div>
                        <label>{todo.name}</label>
                        <p className="text-xs">{dateConvert(todo.date)}</p>
                      </div>
                      <TodoEdit
                        docID={todo.docID}
                        name={todo.name}
                        getTasksFromFirebase={getTasksFromFirebase}
                      />
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
                      <input type="checkbox" />
                      <div>
                        <label
                          style={{
                            textDecoration: todo.isCompleted && "line-through",
                          }}
                        >
                          {todo.name}
                        </label>
                        <p
                          style={{
                            textDecoration: todo.isCompleted && "line-through",
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
