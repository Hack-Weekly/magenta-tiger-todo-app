import { forwardRef, useState } from 'react';
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

    if (!dueDate) {
      setTaskDueDate('');
    } else {
      setTaskDueDate(dueDate.toDate());
    }

    setTaskName(name);
    setTaskTag(tag);
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
          <form
            onSubmit={(e) => handleSave(e)}
            className="flex flex-col gap-2 my-2"
          >
            <label htmlFor="task">Task:</label>
            <input
              name="task"
              value={taskName}
              title="Task name"
              placeholder="Task name"
              onChange={handleNameChange}
              type="text"
              className="w-full py-1 pl-2 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            <label htmlFor="tag">Tag:</label>
            <input
              name="tag"
              value={taskTag}
              title="Task tag"
              placeholder="Task tag"
              onChange={handleTagChange}
              type="text"
              className="w-full py-1 pl-2 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
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
            {taskDueDate.length !== 0 && (
              <Button
                btnText="X"
                type="danger"
                onClick={() => setTaskDueDate('')}
              />
            )}
          </div>
          <div className="mt-2">
            {' '}
            <Button btnText="Save" title="Save task" onClick={handleSave} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TodoEdit;
