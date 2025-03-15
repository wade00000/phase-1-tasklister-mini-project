document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  const prioritySelect = document.getElementById("task-priority");

  // Load saved tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.priority;
      li.innerHTML = `
        <span>${task.text} (${task.priority})</span>
        <button class="edit" data-index="${index}">edit</button>
        <button class="delete" data-index="${index}">X</button>
      `;
      taskList.appendChild(li);
    });
  }

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskInput = document.getElementById("new-task-description");
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText) {
      tasks.push({ text: taskText, priority });
      saveTasks();
      renderTasks();
      taskInput.value = "";
    }
  });

  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const index = e.target.getAttribute("data-index");
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }

    if (e.target.classList.contains("edit")) {
      const index = e.target.getAttribute("data-index");
      const newText = prompt("Edit task:", tasks[index].text);
      if (newText) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
      }
    }
  });
  document.getElementById("sort-asc").addEventListener("click", () => {
    tasks.sort((a, b) => a.priority.localeCompare(b.priority));
    saveTasks();
    renderTasks();
  });
  
  document.getElementById("sort-desc").addEventListener("click", () => {
    tasks.sort((a, b) => b.priority.localeCompare(a.priority));
    saveTasks();
    renderTasks();
  });
  

  renderTasks();
});
