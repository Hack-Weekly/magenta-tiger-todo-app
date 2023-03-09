import { nanoid } from 'nanoid';
import { useState } from 'react';
import { updateTasks } from '../firebase/firestore';

export default function TodoForm({ userUID, getTasksFromFirebase }) {
  const [inputValue, setInputValue] = useState('');

  const addTodo = async (event) => {
    event.preventDefault();
    if (inputValue.length > 0) {
      await updateTasks(userUID, nanoid(), inputValue, Date.now());
      getTasksFromFirebase(userUID);
      setInputValue('');
    }
  };

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
    </section>
  );
}
