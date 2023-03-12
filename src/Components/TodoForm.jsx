import { nanoid } from 'nanoid';
import { forwardRef, useState } from 'react';
import { updateTasks } from '../firebase/firestore';
import { Button } from './Button';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dateConvert from './utilFunctions/dateConvert';

export default function TodoForm({ userUID, getTasksFromFirebase }) {
  const [inputValue, setInputValue] = useState('');
  const [tag, setTag] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addTodo = async (event) => {
    event.preventDefault();
    if (inputValue.length > 0) {
      await updateTasks(
        userUID,
        nanoid(),
        inputValue,
        Date.now(),
        dueDate,
        tag
      );
      await getTasksFromFirebase();
      setInputValue('');
      setTag('');
      setDueDate('');
    }
  };

  const ReactDatePickerInput = forwardRef((props, ref) => (
    <Button
      btnText={dueDate.length === 0 ? 'No due date' : dateConvert(dueDate)}
      type="outlined-border"
      {...props}
    />
  ));

  return (
    <section className="p-5 bg-ice-blue md:rounded-lg">
      <h2 className="text-lg font-bold mb-2">Add new todo</h2>
      <form
        className="grid gap-2 sm:max-w-[300px]  md:max-w-xs"
        onSubmit={addTodo}
      >
        <label className="flex justify-between">
          Your todo:
          <input
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            placeholder="Your todo"
            className="bg-slate-200 pl-2 rounded-md border border-y-dark-blue"
            type="text"
          />
        </label>
        <label className="flex justify-between">
          Tag:
          <input
            value={tag}
            onChange={(event) => {
              setTag(event.target.value);
            }}
            placeholder="Tag"
            className="bg-slate-200 pl-2 rounded-md border border-y-dark-blue"
            type="text"
          />
        </label>

        <div className="flex gap-1">
          <ReactDatePicker
            wrapperClassName="selector-date-wrapper"
            shouldCloseOnSelect
            timeCaption="time"
            dateFormat="MMM d, yyyy"
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            name="datePicker"
            customInput={<ReactDatePickerInput />}
          />
          {dueDate.length !== 0 && (
            <Button btnText="X" type="danger" onClick={() => setDueDate('')} />
          )}
        </div>

        <div className="max-w-[137px] mt-2">
          <Button btnText="Add" htmlType="submit" />
        </div>
      </form>
    </section>
  );
}
