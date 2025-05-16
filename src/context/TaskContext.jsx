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

  const toggleHistory = useCallback((index) => {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].isHistoryVisible = !newTasks[index].isHistoryVisible;
      return newTasks;
    });
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, toggleHistory }}>
      {children}
    </TaskContext.Provider>
  );
}