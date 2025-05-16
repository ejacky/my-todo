import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function SimpleTaskItem({ task }) {
  const { setTasks } = useContext(TaskContext);

  const toggleComplete = () => {
    setTasks(prev => {
      const newTasks = [...prev];
      const targetIndex = newTasks.findIndex(t => t.text === task.text);
      const target = newTasks[targetIndex];
      const newStatus = !target.completed;
      


      target.history.push({
        type: newStatus ? 'complete' : 'revert',
        timestamp: Date.now(),
        relatedTaskType: target.type
      });
      target.completed = newStatus;
      return newTasks;
    });
  };

  return (
    <div className="task-item">
      <div className="task-item__header">
        <h3 className="task-item__title">{task.text}</h3>
        <span className={`task-item__type task-item__type--${task.type}`}>
          {task.type === 'daily' ? '🔄 每日任务' : '🎯 一次性任务'}
        </span>
      </div>
      {task.dueDate && (
        <div className="task-item__due">
          🕒 {new Date(task.dueDate).toLocaleDateString('zh-CN', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      )}
      <button
        className="task-item__complete"
        onClick={toggleComplete}
      >
        {task.completed ? '↩️ 回退' : '✅ 完成'}
      </button>
    </div>
  );
}