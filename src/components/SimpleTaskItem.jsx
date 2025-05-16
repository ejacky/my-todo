import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function SimpleTaskItem({ task }) {
  const { setTasks } = useContext(TaskContext);

  const toggleComplete = () => {
    setTasks(prev => {
      const newTasks = [...prev];
      const target = newTasks.find(t => t.text === task.text);
      const newStatus = !target.completed;
      target.history.push({
        type: newStatus ? 'complete' : 'revert',
        timestamp: Date.now()
      });
      target.completed = newStatus;
      return newTasks;
    });
  };

  return (
    <div className="task-item">
      <h3 className="task-item__title">{task.text}</h3>
      <button
        className="task-item__complete"
        onClick={toggleComplete}
      >
        {task.completed ? '↩️ 回退' : '✅ 完成'}
      </button>
    </div>
  );
}