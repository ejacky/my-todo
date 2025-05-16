import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import SimpleTaskItem from './SimpleTaskItem';

export default function TaskList() {
  const { tasks, toggleTaskStatus } = useContext(TaskContext);

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">当前任务 ({tasks.length})</h2>
      <div className="task-items-wrapper">
        {tasks.map((task, index) => (
          <SimpleTaskItem
            key={index}
            task={task}
            onStatusChange={() => toggleTaskStatus(index)}
          />
        ))}
      </div>
    </div>
  );
}