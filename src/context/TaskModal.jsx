
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskModal = ({ task, onSave, onCancel }) => {
  const [taskDetails, setTaskDetails] = useState(task);
  const [dueDate, setDueDate] = useState(task.dueDate ? new Date(task.dueDate) : new Date());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskDetails.name || !dueDate) return;
    onSave({ ...taskDetails, dueDate });
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">{task.id ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            value={taskDetails.name || ''}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
            required
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={taskDetails.description || ''}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
            required
          />
          <DatePicker
            selected={dueDate}
            onChange={date => setDueDate(date)}
            minDate={new Date()}
            showTimeSelect
            dateFormat="Pp"
            className="w-full mb-4 p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
            required
          />
          <div className="flex justify-end space-x-4">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save Changes</button>
            <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
