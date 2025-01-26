document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add event listener to remove button
        removeButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
        });

        // Append remove button to list item
        listItem.appendChild(removeButton);

        // Append list item to task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // 2. Select DOM Elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // 1. Load Tasks from Local Storage
    loadTasks();
  
    // 3. Create the addTask Function
    function addTask(taskText) {
      // 4. Task Creation and Removal
      const listItem = document.createElement('li');
      listItem.textContent = taskText;
  
      const removeButton = document.createElement('button');
      removeButton.textContent = "Remove";
      removeButton.classList.add('remove-btn');
  
      removeButton.addEventListener('click', () => {
        taskList.removeChild(listItem);
        removeTask(taskText); // Call removeTask function
      });
  
      listItem.appendChild(removeButton);
      taskList.appendChild(listItem);
  
      // 5. Saving Tasks to Local Storage
      saveTask(taskText);
    }
  
    // 5. Saving Tasks to Local Storage
    function saveTask(taskText) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  
    // 5. Saving Tasks to Local Storage
    function removeTask(taskText) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const updatedTasks = storedTasks.filter(task => task !== taskText);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  
    // 1. Load Tasks from Local Storage
    function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.forEach(taskText => addTask(taskText));
    }
  
    // 5. Attach Event Listeners
    addButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      addTask(taskText);
      taskInput.value = "";
    });
  
    taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const taskText = taskInput.value.trim();
        addTask(taskText);
        taskInput.value = "";
      }
    });
  });