import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import SimpleTaskItem from '../components/SimpleTaskItem';

export default function MainPage() {
  const { tasks } = useContext(TaskContext);

  const ongoingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="main-layout">
      <div className="main-section-header">
  <h1 className="main-layout__title">进行中任务</h1>
  <span className="task-count-badge">{ongoingTasks.length} 项进行中</span>
</div>
      
      <div className="task-grid">
        <div className="task-main-section">
          {ongoingTasks.map((task, index) => (
            <SimpleTaskItem key={index} task={task} index={index} />
          ))}
        </div>
        
        <div className="inline-completed">
          <h3>已完成事项</h3>
          {completedTasks.map((task, index) => (
            <div key={index} className="completed-task">
              {task.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}