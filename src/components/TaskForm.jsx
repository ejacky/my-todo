import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function TaskForm() {
  const { setTasks } = useContext(TaskContext);
  const [text, setText] = useState('');
  const [taskType, setTaskType] = useState('once');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTask = {
      text,
      completed: false,
      type: taskType,
      dueDate: dueDate ? new Date(dueDate).setHours(23,59,59,999) : null,
      history: [{ type: 'create', timestamp: Date.now() }],
      isHistoryVisible: false
    };

    setTasks(prev => [...prev, newTask]);
    setText('');
    setDueDate('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新任务内容"
      />
      <select
        value={taskType}
        onChange={(e) => setTaskType(e.target.value)}
      >
        <option value="once">一次性任务</option>
        <option value="daily">每日任务</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit">添加任务</button>
    </form>
  );
}