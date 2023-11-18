import { getFormatedDueDateAndTime } from "../scripts/dates";
import { deleteTodo, dispatchUpdateTodosEvent } from "../scripts/todos";
import NewTaskModal from "./NewTaskModal";
import TodoDetailsModal from "./TodoDetailsModal";
import CheckTodo from "./CheckTodo";

const Todo = (todoObj) => {
  const todoContainerEl = document.createElement("li");
  const todoBodyEl = document.createElement("article");
  const textsWrapperEl = document.createElement("div");
  const todoTitleEl = document.createElement("h2");
  const todoDueEl = document.createElement("p");
  const btnsWrapperEl = document.createElement("div");
  const detailsBtnEl = document.createElement("button");
  const editBtnEl = document.createElement("button");
  const deleteBtnEl = document.createElement("button");

  todoTitleEl.textContent = todoObj.title;
  todoDueEl.textContent = getFormatedDueDateAndTime(
    Date.parse(todoObj.dueDate, todoObj.dueTime)
  );
  detailsBtnEl.textContent = "Details";
  editBtnEl.textContent = "Edit";
  deleteBtnEl.textContent = "Delete";

  detailsBtnEl.addEventListener("click", () => {
    const todoDetailsModalEl = TodoDetailsModal(todoObj);
    todoContainerEl.append(todoDetailsModalEl);
    todoDetailsModalEl.showModal();
  });

  editBtnEl.addEventListener("click", () => {
    const mainEl = document.querySelector("main");
    const editModalEl = NewTaskModal(todoObj);
    mainEl.append(editModalEl);
    editModalEl.showModal();
  });

  deleteBtnEl.addEventListener("click", () => {
    deleteTodo(todoObj);
    dispatchUpdateTodosEvent();
  });

  textsWrapperEl.append(CheckTodo(todoObj), todoTitleEl, todoDueEl);
  btnsWrapperEl.append(detailsBtnEl, editBtnEl, deleteBtnEl);
  todoBodyEl.append(textsWrapperEl, btnsWrapperEl);
  todoContainerEl.append(todoBodyEl);
  return todoContainerEl;
};

export default Todo;
