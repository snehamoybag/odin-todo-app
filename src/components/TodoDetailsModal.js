import { closeAndRemoveModal } from "../scripts/utilities";
import { deleteTodo, dispatchUpdateTodosEvent } from "../scripts/todos";
import TodoDueDate from "./TodoDueDate";
import NewTaskModal from "./NewTaskModal";
import CheckTodo from "./CheckTodo";

const TodoDetailsModal = (todoObj) => {
  const { title, description, priority, inProject, isCompleted } = todoObj;

  const getSpanEl = (text) => {
    const spanEl = document.createElement("span");
    spanEl.textContent = text;
    return spanEl;
  };

  const modalEl = document.createElement("dialog");
  const articleEl = document.createElement("article");
  const taskWrapperEl = document.createElement("div");
  const titleEl = document.createElement("h2");
  const descriptionEl = document.createElement("p");
  const infoWrapperEl = document.createElement("div");
  const dueDateTimeEl = TodoDueDate(todoObj);
  const inProjectEl = document.createElement("p");
  const priorityEl = document.createElement("P");
  const completionStatusEl = document.createElement("p");
  const btnsWrapperEl = document.createElement("div");
  const checkTodoWrapperEl = document.createElement("p");
  const checkTodoEl = CheckTodo(todoObj);
  const checkTodoLabelEl = document.createElement("label");
  const checkBoxWrapperEl = document.createElement("span");
  const checkTodoElIdName = "check-todo-from-todo-details";
  const closeBtnEl = document.createElement("button");
  const editBtnEl = document.createElement("button");
  const deleteBtnEl = document.createElement("button");

  checkTodoEl.id = checkTodoElIdName;
  checkTodoLabelEl.for = checkTodoElIdName;

  modalEl.classList.add("modal-todo-details");
  dueDateTimeEl.classList.add("modal-todo-details__due-date");
  taskWrapperEl.classList.add("modal-todo-details__task-wrapper");
  titleEl.classList.add("modal-todo-details__title");
  descriptionEl.classList.add("modal-todo-details__description");
  infoWrapperEl.classList.add("modal-todo-details__info-wrapper");
  inProjectEl.classList.add("modal-todo-details__info-item", "project");
  priorityEl.classList.add(
    "modal-todo-details__info-item",
    "priority",
    priority
  );
  btnsWrapperEl.classList.add("modal-todo-details__btns-wrapper");
  checkTodoWrapperEl.classList.add("modal-todo-details__check-item");
  checkBoxWrapperEl.classList.add("todo-checkbox-wrapper");
  checkTodoEl.classList.add("todo-checkbox");
  closeBtnEl.classList.add("btn", "btn--cancel");
  editBtnEl.classList.add("btn", "btn--edit");
  deleteBtnEl.classList.add("btn", "btn--danger");

  titleEl.textContent = title;
  descriptionEl.textContent = description;
  inProjectEl.textContent = "In Project: ";
  priorityEl.textContent = "Priority: ";
  completionStatusEl.textContent = `Status: ${
    isCompleted ? "Completed" : "Incomplete"
  }`;
  checkTodoLabelEl.textContent = isCompleted
    ? "Unmark as complete"
    : "Mark as complete";
  closeBtnEl.textContent = "Close";
  editBtnEl.textContent = "Edit";
  deleteBtnEl.textContent = "Delete";

  closeBtnEl.addEventListener("click", () => closeAndRemoveModal(modalEl));

  editBtnEl.addEventListener("click", () => {
    const editTaskModalEl = NewTaskModal(todoObj);
    const mainEl = document.querySelector("main");

    mainEl.append(editTaskModalEl);
    editTaskModalEl.showModal();
    closeAndRemoveModal(modalEl);
  });

  deleteBtnEl.addEventListener("click", () => {
    deleteTodo(todoObj);
    dispatchUpdateTodosEvent();
    closeAndRemoveModal(modalEl);
  });

  taskWrapperEl.append(titleEl, descriptionEl);
  inProjectEl.append(getSpanEl(inProject));
  priorityEl.append(getSpanEl(priority));
  infoWrapperEl.append(inProjectEl, priorityEl);
  articleEl.append(dueDateTimeEl, taskWrapperEl, infoWrapperEl);
  checkBoxWrapperEl.append(checkTodoEl);
  checkTodoLabelEl.prepend(checkBoxWrapperEl);
  checkTodoWrapperEl.append(checkTodoLabelEl);
  btnsWrapperEl.append(checkTodoWrapperEl, closeBtnEl, editBtnEl, deleteBtnEl);
  modalEl.append(articleEl, btnsWrapperEl);

  return modalEl;
};

export default TodoDetailsModal;
