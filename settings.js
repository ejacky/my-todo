// 设置页面逻辑
function addNewTask() {
  const input = document.getElementById('newTaskInput');
  const text = input.value.trim();
  
  if (text) {
    tasks.push({
      text,
      completed: false,
      history: [{type: 'create', timestamp: Date.now()}],
      isHistoryVisible: false
    });
    input.value = '';
    updateStorage();
    renderAllTasks('allTasksList');
  }
}

// 初始化渲染
renderAllTasks('allTasksList');

window.toggleHistory = function(index) {
  tasks[index].isHistoryVisible = !tasks[index].isHistoryVisible;
  updateStorage();
  renderAllTasks('allTasksList');
};