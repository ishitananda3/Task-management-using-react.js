import React, { useState, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useMemo } from 'react';

const priorityColors = {
  High: 'bg-red-500',
  Medium: 'bg-orange-500',
  Low: 'bg-blue-500',
};

const TaskItem = React.memo(({ task, onEdit, onDelete, onMarkDone, onChangePriority, toggleExpand, expandedTaskId }) => {
  const priorityClass = useMemo(() => priorityColors[task.priority] || 'bg-gray-300', [task.priority]);

  return (
    <div className="mb-4 p-4 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white flex items-center">
      <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(task.id)}>
        <h3 className="text-lg font-bold">{task.name}</h3>
        {expandedTaskId === task.id && (
          <div className="mt-2">
            <p className='text-green-800 dark:text-green-200'>Description :</p>
            <p>{task.description}</p>
            <p className='text-green-800 dark:text-green-200'>Due: </p>
            <p>{new Date(task.dueDate).toLocaleString()}</p>
            <div className="flex items-center">
              <p>Priority:</p>
              <select
                value={task.priority || ''}
                onChange={(e) => onChangePriority(task.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="ml-2 p-1 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => onEdit(task)}
                className="bg-green-800 text-white py-2 px-4 rounded-full flex items-center dark:bg-white dark:text-green-800"
              >
                <div className="text-m mr-2 bg-white text-black rounded-full h-6 w-6 flex items-center justify-center">✎</div>Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="bg-green-800 text-white py-2 px-4 rounded-full flex items-center dark:bg-white dark:text-green-800"
              >
                <div className="text-m mr-2 bg-white text-black rounded-full h-6 w-6 flex items-center justify-center">🗑</div>Delete
              </button>
              <button onClick={() => onMarkDone(task.id)} className="bg-green-500 text-white py-2 px-4 rounded-full">Mark as Done</button>
            </div>
          </div>
        )}
      </div>
      <div className={`w-4 h-4 rounded-full ${priorityClass} ml-4`} />
    </div>
  );
});

const TaskDashboard = ({ tasks, onEdit, onDelete, onMarkDone, onChangePriority, searchQuery }) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const toggleExpand = useCallback((taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  }, [expandedTaskId]);

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Row = ({ index, style }) => {
    const task = filteredTasks[index];
    return (
      <div style={style}>
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onMarkDone={onMarkDone}
          onChangePriority={onChangePriority}
          toggleExpand={toggleExpand}
          expandedTaskId={expandedTaskId}
        />
      </div>
    );
  };

  return (
    <List
      height={600}
      itemCount={filteredTasks.length}
      itemSize={200}
      width="100%"
    >
      {Row}
    </List>
  );
};

export default React.memo(TaskDashboard);
