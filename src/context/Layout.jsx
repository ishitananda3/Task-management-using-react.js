import React, { useState, useEffect } from 'react';
import TaskDashboard from './TaskDashboard';
import ThemeToggle from './ThemeToggle';
import TaskModal from './TaskModal';
import ErrorBoundary from './ErrorBoundary'; 

const Layout = () => {
  const getInitialTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  };

  const [tasks, setTasks] = useState(getInitialTasks());
  const [currentTab, setCurrentTab] = useState('All');
  const [modalTask, setModalTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1, priority: '' }]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const markAsDone = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, done: true } : task));
  };

  const changePriority = (taskId, priority) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, priority } : task));
  };

  const filteredTasks = tasks.filter(task => {
    if (currentTab === 'All') return true;
    if (currentTab === 'Done') return task.done;
    return task.priority === currentTab && !task.done;
  });

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 shadow-lg rounded-md">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Task List View</h1>
          <ThemeToggle />
        </header>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded bg-gray-300 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <button
          className="bg-green-800 text-white py-2 px-4 rounded-full flex items-center mt-4 dark:bg-white dark:text-green-800"
          onClick={() => setModalTask({})}
        >
          <div className="text-m mr-2 bg-white dark:bg-green-800 text-black dark:text-white rounded-full h-6 w-6 flex items-center justify-center">+</div>Add Task
        </button>
        <div className="flex space-x-4 mb-4 mt-4">
          {['All', 'High', 'Medium', 'Low', 'Done'].map(tab => (
            <button
              key={tab}
              className={`py-2 px-4 rounded ${currentTab === tab ? 'bg-green-800 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <TaskDashboard
          tasks={filteredTasks}
          onEdit={(task) => setModalTask(task)}
          onDelete={deleteTask}
          onMarkDone={markAsDone}
          onChangePriority={changePriority}
          searchQuery={searchQuery}
        />
        {modalTask && (
          <TaskModal
            task={modalTask}
            onSave={modalTask.id ? editTask : addTask}
            onCancel={() => setModalTask(null)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
