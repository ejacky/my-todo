import React, { createContext, useState, useEffect, useCallback } from 'react';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

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
        timestamp: Date.now()
      });
      task.completed = newStatus;
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