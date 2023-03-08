import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export default function TodoForm() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([
    { id: nanoid(), name: "Buy coffee" },
    { id: nanoid(), name: "Water plants" },
  ]);

  function addTodo(event) {
    event.preventDefault();
    setTodos([...todos, { id: nanoid(), name: inputValue }]);
    setInputValue("");
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <section className="grid gap-4 p-5">
      <form className="flex gap-2" onSubmit={addTodo}>
        <label>
          Your todo:
          <input
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            placeholder="Your todo"
            className="bg-slate-200 pl-2 rounded-sm border border-slate-800"
            type="text"
          />
        </label>
        <button
          className="rounded-md bg-slate-800 text-white px-4"
          type="submit"
        >
          Add
        </button>
      </form>

      <ul className="list-disc">
        {todos.map((todo) => {
          return (
            <li className="list-inside" key={todo.id}>
              {todo.name}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
