import { useState } from 'react';
import { editTask } from '../firebase/firestore';

const TodoEdit = ({ docID, name, getTasksFromFirebase }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(name);

  const handleEdit = () => {
    setIsEditing((prevState) => !prevState);
    setTaskName(name);
  };

  const handleTaskChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    await editTask(docID, taskName);
    await getTasksFromFirebase();
    setIsEditing(false);
  };

  return (
    <div>
      <button
        title="Edit task"
        onClick={handleEdit}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        {!isEditing ? 'Edit' : 'Close'}
      </button>
      {isEditing ? (
        <form onSubmit={(e) => handleSave(e)}>
          <label htmlFor="title">Task:</label>
          <input
            value={taskName}
            title="Task name"
            placeholder="Task name"
            onChange={handleTaskChange}
            type="text"
            className="bg-slate-200 pl-2 rounded-sm border border-slate-800"
          />
          <button
            title="Save task"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
          >
            Save
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default TodoEdit;
