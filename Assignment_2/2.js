/**
 * Functional To‑Do List – JavaScript integration with the HTML page
 *
 * HTML side (`2.html`) provides:
 *   - <input type="text" id="taskInput" placeholder="Enter a task">
 *   - <button id="addBtn">Add</button>
 *   - <ul id="taskList"></ul>
 *
 * This JS file does the following:
 *   1) Finds those HTML elements using document.getElementById(...).
 *   2) Keeps an array of tasks in JavaScript + saves it in browser localStorage.
 *   3) Converts the tasks array into <li> elements inside <ul id="taskList">.
 *   4) Listens for clicks on "Add", "Edit", and "Delete" to update the list.
 *
 * Because this file is included at the bottom of the HTML body:
 *   <script src="2.js"></script>
 * the browser loads the HTML first, then runs this JavaScript, so all the
 * elements already exist and can be selected safely.
 */

// -----------------------------
// 1) CONNECT TO HTML ELEMENTS
// -----------------------------
// These IDs must exactly match the ones defined in `2.html`.
// Once we have these references, we can read and update their content.
const taskInput = document.getElementById("taskInput"); // user types a new task here
const addBtn = document.getElementById("addBtn");       // "Add" button the user clicks
const taskList = document.getElementById("taskList");   // <ul> that will display all tasks

// -----------------------------
// 2) LOAD EXISTING TASKS
// -----------------------------
// We use browser localStorage so that tasks stay even after refreshing the page.
// - localStorage.getItem("tasks") returns a string like '["Task 1","Task 2"]'
//   or null if nothing has been saved yet.
// - JSON.parse(...) converts the string back into a real JavaScript array.
// - If result is null, we default to [] so `tasks` is always an array.
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// -------------------------------------------
// 3) RENDER TASKS ARRAY INTO THE HTML <ul>
// -------------------------------------------
/**
 * Renders the `tasks` array into the <ul id="taskList"> on the page.
 *
 * Steps:
 *  - Clear any existing list items.
 *  - Loop over `tasks`.
 *  - For each task, create an <li> with:
 *       <span>task text</span>
 *       <div>
 *         <button class="edit-btn">Edit</button>
 *         <button class="delete-btn">Delete</button>
 *       </div>
 *  - Attach click handlers to those buttons so they call editTask(...) or
 *    deleteTask(...) with the correct index.
 */
const renderTasks = () => {
  // Remove all current children of <ul id="taskList"> so we can redraw from scratch.
  taskList.innerHTML = "";

  // Loop through the array and create one <li> per task.
  tasks.forEach((task, index) => {
    // Create a new <li> element (not yet attached to the DOM).
    const li = document.createElement("li");

    // Set inner HTML of the <li>.
    // Note: template literals (backticks) let us inject JS values like ${task}.
    li.innerHTML = `
      <span>${task}</span>
      <div>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Find the "Edit" button within this <li> and attach a click listener.
    // When clicked, it will call editTask(index) with the correct task position.
    li.querySelector(".edit-btn").addEventListener("click", () => {
      editTask(index);
    });

    // Find the "Delete" button within this <li> and attach a click listener.
    // When clicked, it will call deleteTask(index) to remove that task.
    li.querySelector(".delete-btn").addEventListener("click", () => {
      deleteTask(index);
    });

    // After we prepare the <li>, attach it to the <ul> in the HTML.
    taskList.appendChild(li);
  });
};

// --------------------------------------
// 4) ADD NEW TASK (HTML "Add" BUTTON)
// --------------------------------------
// Here we say: "When the Add button is clicked, run this function."
addBtn.addEventListener("click", () => {
  // Read what the user typed and remove leading/trailing spaces.
  const task = taskInput.value.trim();

  // Guard clause: if the input is empty, show a message and stop here.
  if (task === "") {
    alert("Plz Enter a Task ");
    return;
  }

  // Add the new task text into our in-memory array.
  tasks.push(task);

  // Save the updated array to localStorage as a JSON string.
  localStorage.setItem("tasks", JSON.stringify(tasks)); // updated array saved in browser

  // Clear the text box so user can type the next task.
  taskInput.value = "";

  // Re-render the visible list so the new task appears immediately.
  renderTasks();
});

// --------------------------------------
// 5) DELETE TASK (HTML "Delete" BUTTON)
// --------------------------------------
/**
 * Removes one task from the `tasks` array and updates the UI + localStorage.
 * @param {number} index - position of the task in the array to delete.
 */
const deleteTask = (index) => {
  // Remove exactly 1 item at the given index.
  tasks.splice(index, 1);

  // Save the updated tasks array to localStorage.
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Re-render the list so the removed task disappears from the page.
  renderTasks();
};

// ------------------------------------
// 6) EDIT TASK (HTML "Edit" BUTTON)
// ------------------------------------
/**
 * Opens a prompt allowing the user to change the text of an existing task.
 * If the user confirms with non-empty text, we update the array + UI + storage.
 *
 * @param {number} index - position of the task in the array to edit.
 */
const editTask = (index) => {
  // Show a browser prompt with the current task pre-filled for editing.
  const newTask = prompt("Edit your Task", tasks[index]); // shows old value so user can modify it

  // Only update if:
  //  - user did not cancel (newTask !== null)
  //  - user did not leave the field blank after trimming spaces
  if (newTask !== null && newTask.trim() !== "") {
    // Save the updated text into the array.
    tasks[index] = newTask.trim();

    // Persist the updated array to localStorage.
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Re-render the list so the edited task text appears on screen.
    renderTasks();
  }
};

// ------------------------------------
// 7) INITIAL RENDER ON PAGE LOAD
// ------------------------------------
// As soon as this JS file loads (after the HTML), we call renderTasks().
// This makes any tasks already saved in localStorage appear in the list.
renderTasks();


