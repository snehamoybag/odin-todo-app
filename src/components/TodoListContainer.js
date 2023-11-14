const todoListContainerId = "todo-list-container";

export const TodoListContainer = () => {
  const containerEl = document.createElement("div");

  containerEl.id = todoListContainerId;
  containerEl.classList.add("todos__container");

  return containerEl;
};

export const getDOMTodoListContainer = () =>
  document.querySelector(`#${todoListContainerId}`);
