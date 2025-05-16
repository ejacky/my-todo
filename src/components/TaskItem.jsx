import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function TaskItem({ task, index }) {
  const { toggleHistory, deleteTask } = useContext(TaskContext);

  return (
    <div className="task-item">
      <h3 className="task-item__title">{task.text}</h3>
      <button 
        className="task-item__history-toggle"
        onClick={() => toggleHistory(index)}
      >
        历史记录
      </button>
      <button
        className="task-item__delete"
        onClick={() => deleteTask(index)}
      >
        删除
      </button>
      
      {task.isHistoryVisible && (
        <div className="task-item__history">
          {task.history.map((h, i) => (
            <div key={i} className="task-item__history-record">
              <span className="task-item__timestamp">
                [{new Date(h.timestamp).toLocaleString()}]
              </span>
              <span className={`task-item__type task-item__type--${h.type}`}>
                {h.type === 'complete' && '✅ 完成'}
                {h.type === 'revert' && '↩️ 回退'}
                {h.type === 'create' && '🆕 创建'}
              </span>
              {h.reason && (
                <span className="task-item__reason">{h.reason}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}