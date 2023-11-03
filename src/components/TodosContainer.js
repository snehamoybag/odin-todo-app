export const todosContainerId = "todos-container";

export const TodosContainer = () => {
  const todosContainerEl = document.createElement("ol");

  todosContainerEl.setAttribute("id", todosContainerId);
  todosContainerEl.classList.add("todos");

  return todosContainerEl;
};
