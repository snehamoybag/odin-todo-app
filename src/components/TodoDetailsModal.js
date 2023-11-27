import { getFormatedDueDateAndTime } from "../scripts/dates";
import { closeAndRemoveModal } from "../scripts/utilities";
import { deleteTodo, dispatchUpdateTodosEvent } from "../scripts/todos";
import NewTaskModal from "./NewTaskModal";
import CheckTodo from "./CheckTodo";

const TodoDetailsModal = (todoObj) => {
  const {
    title,
    description,
    dueDate,
    dueTime,
    priority,
    inProject,
    isCompleted,
  } = todoObj;
  const modalEl = document.createElement("dialog");
  const articleEl = document.createElement("article");
  const textWrapperEl = document.createElement("div");
  const titleEl = document.createElement("h2");
  const descriptionEl = document.createElement("p");
  const dueDateTimeEl = document.createElement("p");
  const inProjectEl = document.createElement("p");
  const priorityEl = document.createElement("P");
  const completionStatusEl = document.createElement("p");
  const btnsWrapperEl = document.createElement("div");
  const checkTodoWrapperEl = document.createElement("p");
  const checkTodoEl = CheckTodo(todoObj);
  const checkTodoLabelEl = document.createElement("label");
  const checkTodoElIdName = "check-todo-from-todo-details";
  const closeBtnEl = document.createElement("button");
  const editBtnEl = document.createElement("button");
  const deleteBtnEl = document.createElement("button");

  checkTodoEl.id = checkTodoElIdName;
  checkTodoLabelEl.for = checkTodoElIdName;

  modalEl.classList.add("modal-todo-details");
  dueDateTimeEl.classList.add("modal-todo-details__due-date");
  textWrapperEl.classList.add("modal-todo-details__texts-wrapper");
  titleEl.classList.add("modal-todo-details__title");
  descriptionEl.classList.add("modal-todo-details__description");
  checkTodoWrapperEl.classList.add("modal-todo-details__check-wrapper");
  btnsWrapperEl.classList.add("modal-todo-details__btns-wrapper");

  titleEl.textContent = title;
  descriptionEl.textContent = description;
  dueDateTimeEl.textContent = getFormatedDueDateAndTime(
    Date.parse(`${dueDate} ${dueTime}`)
  );
  inProjectEl.textContent = `In Project: ${inProject}`;
  priorityEl.textContent = `Priority: ${priority}`;
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

  textWrapperEl.append(titleEl, descriptionEl, inProjectEl, priorityEl);
  articleEl.append(dueDateTimeEl, textWrapperEl);
  checkTodoLabelEl.prepend(checkTodoEl);
  btnsWrapperEl.append(checkTodoLabelEl, closeBtnEl, editBtnEl, deleteBtnEl);
  modalEl.append(articleEl, btnsWrapperEl);

  return modalEl;
};

export default TodoDetailsModal;
