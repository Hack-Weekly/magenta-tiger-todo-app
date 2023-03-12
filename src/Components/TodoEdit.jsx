import { useState, forwardRef } from 'react';
import { editTask } from '../firebase/firestore';
import { Button } from './Button';

import dateConvert from './utilFunctions/dateConvert';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoEdit = ({ docID, name, getTasksFromFirebase, dueDate, tag }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(name);
  const [taskTag, setTaskTag] = useState(tag);
  const [taskDueDate, setTaskDueDate] = useState('');

  const handleEdit = () => {
    setIsEditing((prevState) => !prevState);

    if (dueDate.length === 0) {
      setTaskDueDate('');
    } else {
      setTaskDueDate(dueDate.toDate());
    }

    setTaskName(name);
    seTaskTag(tag);
  };

  const handleNameChange = (event) => {
    setTaskName(event.target.value);
  };
  const handleTagChange = (event) => {
    setTaskTag(event.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    await editTask(docID, taskName, taskDueDate, taskTag);
    await getTasksFromFirebase();
    setIsEditing(false);
  };

  const ReactDatePickerInput = forwardRef((props, ref) => (
    <Button
      btnText={
        taskDueDate.length === 0 ? 'No due date' : dateConvert(taskDueDate)
      }
      type="outlined"
      {...props}
    />
  ));

  return (
    <div>
      <Button
        title="Edit task"
        onClick={handleEdit}
        btnText={!isEditing ? 'Edit' : 'Close'}
        type="outlined"
      />

      {isEditing ? (
        <>
          <form onSubmit={(e) => handleSave(e)}>
            <label htmlFor="title">Task:</label>
            <input
              value={taskName}
              title="Task name"
              placeholder="Task name"
              onChange={handleNameChange}
              type="text"
              className="bg-slate-200 pl-2 rounded-sm border border-slate-800"
            />
            <input
              value={taskTag}
              title="Task tag"
              placeholder="Task tag"
              onChange={handleTagChange}
              type="text"
              className="bg-slate-200 pl-2 rounded-sm border border-slate-800"
            />
            <Button btnText="Save" title="Save task" />
          </form>{' '}
          <div className="flex gap-1">
            <ReactDatePicker
              wrapperClassName="selector-date-wrapper"
              shouldCloseOnSelect
              timeCaption="time"
              dateFormat="MMM d, yyyy"
              selected={taskDueDate}
              onChange={(date) => setTaskDueDate(date)}
              name="datePicker"
              customInput={<ReactDatePickerInput />}
            />
            {taskDueDate.length > 0 && (
              <Button
                btnText="X"
                type="danger"
                onClick={() => setTaskDueDate('')}
              />
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TodoEdit;
