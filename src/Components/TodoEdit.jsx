import { useState } from 'react';
import { editTask } from '../firebase/firestore';
import { Button } from './Button';

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
      <Button
        title="Edit task"
        onClick={handleEdit}
        btnText={!isEditing ? 'Edit' : 'Close'}
        type="outlined"
      />

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
          <Button btnText="Save" title="Save task" />
        </form>
      ) : null}
    </div>
  );
};

export default TodoEdit;
