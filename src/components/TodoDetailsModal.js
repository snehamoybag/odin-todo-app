import { getFormatedDueDateAndTime } from "../scripts/dates";
import { closeAndRemoveModal } from "../scripts/utilities";
import { getDOMTodoListContainer } from "./TodoListContainer";
import { deleteTodo, dispatchUpdateTodosEvent } from "../scripts/todos";
import NewTaskModal from "./NewTaskModal";

const TodoDetailsModal = (todoObj) => {
  const { title, description, dueDate, dueTime, priority, inProject } = todoObj;
  const modalEl = document.createElement("dialog");
  const articleEl = document.createElement("article");
  const titleEl = document.createElement("h2");
  const descriptionEl = document.createElement("p");
  const dueDateTimeEl = document.createElement("p");
  const inProjectEl = document.createElement("p");
  const priorityEl = document.createElement("P");
  const btnsWrapperEl = document.createElement("div");
  const closeBtnEl = document.createElement("button");
  const editBtnEl = document.createElement("button");
  const deleteBtnEl = document.createElement("button");

  titleEl.textContent = title;
  descriptionEl.textContent = description;
  dueDateTimeEl.textContent = getFormatedDueDateAndTime(
    Date.parse(dueDate, dueTime)
  );
  inProjectEl.textContent = `In Project ${inProject}`;
  priorityEl.textContent = `Priority; ${priority}`;
  closeBtnEl.textContent = "Close";
  editBtnEl.textContent = "Edit";
  deleteBtnEl.textContent = "Delete";

  closeBtnEl.addEventListener("click", () => closeAndRemoveModal(modalEl));

  editBtnEl.addEventListener("click", () => {
    const editTaskModalEl = NewTaskModal(todoObj);
    const todosListContainerEl = getDOMTodoListContainer();

    todosListContainerEl.append(editTaskModalEl);
    editTaskModalEl.showModal();
    closeAndRemoveModal(modalEl);
  });

  deleteBtnEl.addEventListener("click", () => {
    deleteTodo(todoObj);
    dispatchUpdateTodosEvent();
    closeAndRemoveModal(modalEl);
  });

  articleEl.append(
    dueDateTimeEl,
    titleEl,
    descriptionEl,
    inProjectEl,
    priorityEl
  );
  btnsWrapperEl.append(closeBtnEl, editBtnEl, deleteBtnEl);
  modalEl.append(articleEl, btnsWrapperEl);

  return modalEl;
};

export default TodoDetailsModal;
