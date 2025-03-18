document.addEventListener("DOMContentLoaded", () => { 
  const taskForm = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  const prioritySelect = document.getElementById("task-priority");

  // Load saved tasks from local storage or initialize an empty array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to save tasks to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to render tasks on the page
  function renderTasks() {
    taskList.innerHTML = ""; // Clear the task list before re-rendering
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.priority; // Assign priority as a class for styling
      li.innerHTML = `
        <span>${task.text} (${task.priority})</span>
        <button class="edit" data-index="${index}">edit</button>
        <button class="delete" data-index="${index}">X</button>
      `;
      taskList.appendChild(li);
    });
  }

  // Event listener for form submission to add a new task
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload
    const taskInput = document.getElementById("new-task-description");
    const taskText = taskInput.value.trim(); // Trim whitespace
    const priority = prioritySelect.value;

    if (taskText) {
      tasks.push({ text: taskText, priority }); // Add new task to the array
      saveTasks(); // Save tasks to local storage
      renderTasks(); // Update task list on the page
      taskInput.value = ""; // Clear input field
    }
  });

  // Event listener for deleting and editing tasks
  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) { 
      // Delete the selected task
      const index = e.target.getAttribute("data-index");
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }

    if (e.target.classList.contains("edit")) { 
      // Edit the selected task
      const index = e.target.getAttribute("data-index");
      const newText = prompt("Edit task:", tasks[index].text);
      if (newText) {
        tasks[index].text = newText; 
        saveTasks();
        renderTasks();
      }
    }
  });

  // Event listener to sort tasks in ascending order of priority
  document.getElementById("sort-asc").addEventListener("click", () => {
    tasks.sort((a, b) => a.priority.localeCompare(b.priority));
    saveTasks();
    renderTasks();
  });

  // Event listener to sort tasks in descending order of priority
  document.getElementById("sort-desc").addEventListener("click", () => {
    tasks.sort((a, b) => b.priority.localeCompare(a.priority));
    saveTasks();
    renderTasks();
  });

  renderTasks(); // Render saved tasks on page load
});
