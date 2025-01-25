document.addEventListener('DOMContentLoaded', function() {
    async function fetchUserData() {
      const apiUrl = 'https://jsonplaceholder.typicode.com/users';
      const dataContainer = document.getElementById('api-data');
  
      try {
        const response = await fetch(apiUrl);
        const users = await response.json();
  
        dataContainer.innerHTML = ''; // Clear the loading message
        const userList = document.createElement('ul');
        users.forEach(user => {
          const listItem = document.createElement('li');
          listItem.textContent = user.name;
          userList.appendChild(listItem);
        });
  
        dataContainer.appendChild(userList);
        loadTasks(); // Load tasks from Local Storage
      } catch (error) {
        dataContainer.innerHTML = 'Failed to load user data.';
      }
    }
  
    fetchUserData();
  
    function loadTasks() {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        const taskList = document.getElementById('task-list');
        tasks.forEach(task => {
          const taskItem = document.createElement('li');
          taskItem.textContent = task;
          taskList.appendChild(taskItem);
        });
      }
    }
  
    document.getElementById('add-task-form').addEventListener('submit', function(event) {
      event.preventDefault();
      
      const taskInput = document.getElementById('task-input');
      const newTask = taskInput.value.trim();
      if (newTask === '') return;
  
      const taskList = document.getElementById('task-list');
      const taskItem = document.createElement('li');
      taskItem.textContent = newTask;
      taskList.appendChild(taskItem);
  
      saveTask(newTask);
      taskInput.value = ''; // Clear the input field
    });
  
    function saveTask(task) {
      let tasks = localStorage.getItem('tasks');
      tasks = tasks ? JSON.parse(tasks) : [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
  