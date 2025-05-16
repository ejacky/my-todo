import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/SettingsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <TaskProvider>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  </TaskProvider>
);