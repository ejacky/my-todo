// 共享任务数据和方法
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderAllTasks(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = tasks.map((task, index) => `
    <div class="task-item">
      <h3>${task.text}</h3>
      <button onclick="toggleHistory(${index})">历史记录</button>
      <div class="task-history" style="display: ${task.isHistoryVisible ? 'block' : 'none'}">
        ${task.history.map(h => `
          <div class="history-item">
            [${new Date(h.timestamp).toLocaleString()}] 
            ${h.type === 'complete' ? '✅ 完成' : h.type === 'revert' ? '↩️ 回退' : '🆕 创建'}

            ${h.reason ? ': ' + h.reason : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}