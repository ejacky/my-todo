import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

export default function SettingsPage() {
  const { tasks, setTasks } = useContext(TaskContext);

  return (
    <div className="settings-layout">
      <h2 className="settings-layout__title">任务管理</h2>
      <TaskForm />
      <div className="task-sections">
        <section className="task-section">
          <h3>进行中的任务 ({tasks.filter(t => t.status === '进行中').length})</h3>
          <div className="task-list">
            {tasks
              .filter(t => t.status === '进行中')
              .map((task, index) => (
                <TaskItem key={index} task={task} index={index} />
              ))}
          </div>
        </section>
        
        <section className="task-section">
          <h3>已完成的任务 ({tasks.filter(t => t.status === '已完成').length})</h3>
          <div className="task-list">
            {tasks
              .filter(t => t.status === '已完成')
              .map((task, index) => (
                <TaskItem key={index} task={task} index={index} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}