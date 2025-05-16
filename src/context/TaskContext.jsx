import React, { createContext, useState, useEffect, useCallback } from 'react';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved).map(t => ({
      ...t,
      type: t.type || 'once',
      status: t.completed ? '已完成' : '进行中',
      dueDate: t.dueDate ? new Date(t.dueDate) : null
    })) : [];
  });

  useEffect(() => {
    const checkAndGenerateDailyTasks = () => {
      const now = new Date();
      const savedTime = localStorage.getItem('resetTime') || '2:30';
      const [hours, minutes] = savedTime.split(':').map(Number);
      const resetTime = new Date(now);
      resetTime.setHours(hours, minutes, 0, 0);

      setTasks(prev => {
        return prev.map(task => {
          if (task.type === 'daily' && task.completed && now >= resetTime) {
            return {
              ...task,
              completed: false,
              status: '进行中',
              dueDate: new Date(resetTime.setDate(resetTime.getDate() + 1)),
              history: [...task.history, { type: 'create', timestamp: Date.now() }]
            };
          }
          return task;
        });
      });
    };

    const interval = setInterval(checkAndGenerateDailyTasks, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleComplete = useCallback((index) => {
    setTasks(prev => {
      const newTasks = [...prev];
      const task = newTasks[index];
      const newStatus = !task.completed;
      task.history.push({
        type: newStatus ? 'complete' : 'revert',
        timestamp: Date.now(),
        relatedTaskType: task.type
      });
      task.completed = newStatus;
      task.status = newStatus ? '已完成' : '进行中';
      return newTasks;
    });
  }, []);

  const toggleHistory = useCallback((index) => {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].isHistoryVisible = !newTasks[index].isHistoryVisible;
      return newTasks;
    });
  }, []);

  const deleteTask = useCallback((index) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, toggleHistory, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}