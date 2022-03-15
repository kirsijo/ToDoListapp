let toDoList = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

localStorage.setItem("items", JSON.stringify(toDoList));

const addButton = document.querySelector("#addBtn");
const clearButton = document.querySelector("#clear-button");

const taskText = document.querySelector("#newtask");

listItem = document.getElementById("listitem");

const addTask = (event) => {
  event.preventDefault();
  if (taskText.value.length === 0) {
    alert("Please enter a task");
  } else {
    let newTask = document.querySelector("#newtask").value;

    toDoList.push(newTask);

    localStorage.setItem("items", JSON.stringify(toDoList));

    makeList();
  }
};

addButton.addEventListener("click", addTask);

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  toDoList = [];
  localStorage.clear("items");
  makeList();
});

const makeList = () => {
  let listHTML = "";

  /* create HTML elements */

  toDoList.forEach((item, taskIndex) => {
    listHTML += `<li data-taskindex="${taskIndex}"> <span id="task-text-${taskIndex}"></span><button class="check-button"> <span class="material-icons">done_outline</span> </button> <button class="trash-button"><span class="material-icons">
    delete
    </span></button></li>`;
  });
  listItem.innerHTML = listHTML;

  /* Set user input on the list - doing my best with current knowledge to avoid problems with innerHTML */

  toDoList.forEach((item, taskIndex) => {
    document.getElementById(`task-text-${taskIndex}`).textContent = item;
  });

  const checkButtons = document.querySelectorAll("button.check-button");
  checkButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      button.parentElement.classList.add("checked");
    });
  });
  const jobDoneButtons = document.querySelectorAll("button.trash-button");
  jobDoneButtons.forEach((button, i) => {
    button.addEventListener("click", (event) => {
      console.log(event);
      const taskIndex = event.currentTarget.parentElement.dataset.taskindex;
      toDoList.splice(taskIndex, 1);
      localStorage.setItem("items", JSON.stringify(toDoList));
      makeList();
    });
  });
};
makeList();
