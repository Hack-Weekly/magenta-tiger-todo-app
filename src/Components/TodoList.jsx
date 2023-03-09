import { useState, useEffect } from 'react';

const TodoList = ({ tasks }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(tasks);
  }, [tasks]);

  return (
    <section>
      <ul className="list-disc">
        {todos
          ? todos
              .sort((a, b) => b.date - a.date)
              .map((todo) => {
                return (
                  <li className="list-inside" key={todo.id}>
                    <p>name - {todo.name}</p>
                    <p>date - {todo.date}</p>
                    <p>id - {todo.id}</p>
                  </li>
                );
              })
          : null}
      </ul>
    </section>
  );
};

export default TodoList;
