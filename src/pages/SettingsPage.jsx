import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';

export default function SettingsPage() {
  const { tasks, setTasks } = useContext(TaskContext);
  const [newTask, setNewTask] = useState('');

  const addNewTask = () => {
    if (newTask.trim()) {
      setTasks(prev => [
        ...prev,
        {
          text: newTask.trim(),
          completed: false,
          history: [{ type: 'create', timestamp: Date.now() }],
          isHistoryVisible: false
        }
      ]);
      setNewTask('');
    }
  };

  return (
    <div className="settings-layout">
      <h2 className="settings-layout__title">任务管理</h2>
      <div className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="新任务内容"
        />
        <button onClick={addNewTask}>添加任务</button>
      </div>
      <div className="all-tasks-list">
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} index={index} />
        ))}
      </div>
    </div>
  );
}