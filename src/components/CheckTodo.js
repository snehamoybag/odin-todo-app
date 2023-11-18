import {
  updateTodoCompletionStatus,
  dispatchUpdateTodosEvent,
} from "../scripts/todos";
import { setElementProps } from "../scripts/utilities";

const CheckTodo = (todoObj) => {
  const checkboxEl = document.createElement("input");

  setElementProps(checkboxEl, {
    type: "checkbox",
    name: "check-todo",
    title: `${todoObj.isCompleted ? "Unmark as complete" : "Mark as complete"}`,
  });

  if (todoObj.isCompleted) checkboxEl.checked = true;

  checkboxEl.addEventListener("change", () => {
    updateTodoCompletionStatus(todoObj);
    dispatchUpdateTodosEvent();
  });

  return checkboxEl;
};

export default CheckTodo;
