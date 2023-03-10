import { useState, useEffect } from 'react';
import TodoEdit from './TodoEdit';
import dateConvert from './utilFunctions/dateConvert';

const TodoList = ({ tasks, getTasksFromFirebase }) => {
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
                    <p>date - {dateConvert(todo.date)}</p>
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
    </section>
  );
};

export default TodoList;
