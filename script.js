document.addEventListener('DOMContentLoaded', () => {

  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

 
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];// gets the item from local storage

  tasks.forEach(task => renderTasks(task));//displays

  addTaskButton.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    }; //creates new object

    tasks.push(newTask);
    saveTasks();
    renderTasks(newTask);


    todoInput.value = "";
  });

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function renderTasks(task) {
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    li.setAttribute("data-id", task.id);
    li.innerHTML = `
      <span>${task.text}</span>
      <button>delete</button>
    `;

    li.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') return;

      task.completed = !task.completed;
      li.classList.toggle('completed');
      saveTasks();
    });

    li.querySelector('button').addEventListener("click", (e) => {
      e.stopPropagation();   
      tasks = tasks.filter(t => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }

});












































