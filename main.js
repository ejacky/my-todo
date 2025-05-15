// 主页面逻辑
import './shared.js';

const taskList = document.getElementById('taskList');
const completedList = document.getElementById('completedList');

function renderMainTasks() {
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  taskList.innerHTML = activeTasks.map((task, index) => `
    <li>
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <button class="history-toggle" onclick="toggleHistory(${index})">▶</button>
      <div class="task-history" style="display: ${task.isHistoryVisible ? 'block' : 'none'}">
        ${(task.history || []).map(h => `
          <div class="history-item">
            [${new Date(h.timestamp).toLocaleString()}] 
            ${h.type === 'complete' ? '✅ 完成' : h.type === 'revert' ? '↩️ 回退' : '🆕 创建'}
            ${h.reason ? ': ' + h.reason : ''}
          </div>
        `).join('')}
      </div>
      <button onclick="deleteTask(${index})">×</button>
    </li>
  `).join('');

  completedList.innerHTML = completedTasks.map((task, index) => `
    <li class="completed">
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <button class="history-toggle" onclick="toggleHistory(${index})">▶</button>
      <div class="task-history" style="display: ${task.isHistoryVisible ? 'block' : 'none'}">
        ${task.history.map(h => `
          <div class="history-item">
            [${new Date(h.timestamp).toLocaleString()}] 
            ${h.type === 'complete' ? '✅ 完成' : h.type === 'revert' ? '↩️ 回退' : '🆕 创建'}
            ${h.reason ? ': ' + h.reason : ''}
          </div>
        `).join('')}
      </div>
      <button onclick="deleteTask(${index})">×</button>
    </li>
  `).join('');
}

// 初始化渲染
renderMainTasks();