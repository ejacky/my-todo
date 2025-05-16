import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SettingsPage from './pages/SettingsPage';

function App({ children }) {
  return (
    <TaskProvider>
      <BrowserRouter basename="/">
        <nav style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
          <Link to="/" style={{ marginRight: '20px' }}>🏠 任务列表</Link>
          <Link to="/settings">⚙️ 系统设置</Link>
        </nav>

        <div className="App" style={{ padding: '20px' }}>
          {children}
        </div>
      </BrowserRouter>
    </TaskProvider>
  );
}

const Root = () => {
  return (
    <React.StrictMode>
      <App>
        <Routes>
          <Route path="/" element={
            <>
              <TaskList />
            </>
          } />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </App>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

export default Root;