import { renderAllTodos, listenUpdateTodosEvent } from "../scripts/todos";
import Todo from "./Todo";

export const todosContainerId = "todos-container";

export const TodosContainer = () => {
  const todosContainerEl = document.createElement("ol");

  todosContainerEl.setAttribute("id", todosContainerId);
  todosContainerEl.classList.add("todos");

  // listen for anychange in the todos list and re-render it

  listenUpdateTodosEvent(() => {
    const todosContainerDOMEl = document.querySelector(`#${todosContainerId}`);

    todosContainerDOMEl.innerHTML = ""; // remove prev renders
    renderAllTodos(Todo, todosContainerDOMEl);
  });

  return todosContainerEl;
};
