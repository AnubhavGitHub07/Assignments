//taskInput
//addBtn
//taskList

//Select Required DOM Elements!!

//We will select those Html elements , which we want to access using JS .

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

//Fetch Tasks from local storage .

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//Render Tasks on Screen .

const renderTasks = () => {
    taskList.innerHTML = "";
  
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${task}</span>
        <div>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
  
      li.querySelector(".edit-btn").addEventListener("click", () => {
        editTask(index);
      });
  
      li.querySelector(".delete-btn").addEventListener("click", () => {
        deleteTask(index);
      });
  
      taskList.appendChild(li);
    });
  };
  

  //Add New Task

  addBtn.addEventListener("click" , () => {
    const task = taskInput.value.trim();

    if(task == ""){
        alert("Plz Enter a Task ");
        return;
    }

    tasks.push(task);
    localStorage.setItem("tasks" ,JSON.stringify(tasks)); //updated array save hoti hai browser me 

    taskInput.value ="";
    renderTasks();

  });

  //Delete Task

  const deleteTask = (index) =>{
    tasks.splice(index , 1);
    localStorage.setItem("tasks" , JSON.stringify(tasks)); //update array 
    renderTasks();
  };

  //Edit Task

  const editTask = (index) =>{
    const newTask = prompt("Edit yout Task" , tasks[index]); // prompt user ko existing task ke sath edit option deta hai.

    if(newTask !== null && newTask.trim() !== ""){
        // Update task value in array
        tasks[index] = newTask.trim();

        // Save updated tasks array to localStorage
        localStorage.setItem("tasks" , JSON.stringify(tasks));

        // Re-render updated list on screen
        renderTasks();
    }    

  };

  renderTasks();
