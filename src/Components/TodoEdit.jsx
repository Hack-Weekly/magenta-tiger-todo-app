import { useState, forwardRef } from 'react';
import { editTask } from '../firebase/firestore';
import { Button } from './Button';

import dateConvert from './utilFunctions/dateConvert';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoEdit = ({ docID, name, getTasksFromFirebase, dueDate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(name);
  const [taskDueDate, setTaskDueDate] = useState('');

  const handleEdit = () => {
    if (dueDate.length > 0) {
      setTaskDueDate(dueDate.toDate());
    }
    setIsEditing((prevState) => !prevState);
    setTaskName(name);
  };

  const handleTaskChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    await editTask(docID, taskName, taskDueDate);
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
              onChange={handleTaskChange}
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
            {taskDueDate.length === 0 ? null : (
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
