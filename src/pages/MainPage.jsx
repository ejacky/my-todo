import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';

export default function MainPage() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="main-layout">
      <h2 className="main-layout__title">进行中任务</h2>
      <div className="task-list">
        {tasks
          .filter(task => !task.completed)
          .map((task, index) => (
            <TaskItem key={index} task={task} index={index} />
          ))}
      </div>
    </div>
  );
}