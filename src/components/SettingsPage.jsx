import React, { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [resetTime, setResetTime] = useState('02:30');

  useEffect(() => {
    const savedTime = localStorage.getItem('resetTime') || '02:30';
    setResetTime(savedTime);
  }, []);

  const handleTimeChange = (e) => {
    const time = e.target.value;
    if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
      localStorage.setItem('resetTime', time);
      setResetTime(time);
    }
  };

  return (
    <div className="settings-page">
      <h2>系统设置</h2>
      <div className="time-picker">
        <label>每日任务重置时间：</label>
        <input
          type="time"
          value={resetTime}
          onChange={handleTimeChange}
          step="60"
        />
        <small>（24小时制，精确到分钟）</small>
      </div>
    </div>
  );
}