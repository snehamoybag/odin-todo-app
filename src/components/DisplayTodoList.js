const DisplayTodoList = () => {
  const displayTodoListEl = document.createElement("ol");

  displayTodoListEl.classList.add("todo-display");
  displayTodoListEl.textContent = "hi";

  return displayTodoListEl;
};

export default DisplayTodoList;
