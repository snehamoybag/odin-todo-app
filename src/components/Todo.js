import { titleCase, turncateString } from "../scripts/utilities";
import { deleteTodo, dispatchUpdateTodosEvent } from "../scripts/todos";
import TodoDueDate from "./TodoDueDate";
import NewTaskModal from "./NewTaskModal";
import TodoDetailsModal from "./TodoDetailsModal";
import CheckTodo from "./CheckTodo";

const Todo = (todoObj) => {
  const todoContainerEl = document.createElement("li");
  const todoBodyEl = document.createElement("article");
  const textsWrapperEl = document.createElement("div");
  const checkTodoWrapperEl = document.createElement("label");
  const checkTodoEl = CheckTodo(todoObj);
  const todoTitleEl = document.createElement("h2");
  const todoDueEl = TodoDueDate(todoObj);
  const priorityEl = document.createElement("p");
  const btnsWrapperEl = document.createElement("div");
  const detailsBtnEl = document.createElement("button");
  const editBtnEl = document.createElement("button");
  const deleteBtnEl = document.createElement("button");

  priorityEl.title = "Priority";

  todoContainerEl.classList.add("todo-list__item");
  todoBodyEl.classList.add("todo-list__item-body");
  checkTodoWrapperEl.classList.add("todo-checkbox-wrapper");
  checkTodoEl.classList.add("todo-checkbox");
  todoTitleEl.classList.add("todo-list__item-title");
  if (todoObj.isCompleted) todoTitleEl.classList.add("strikethrough");
  priorityEl.classList.add("todo-list__item-priority");
  todoDueEl.classList.add("todo-list__item-due-date");
  textsWrapperEl.classList.add("todo-list__item-texts-wrapper");
  btnsWrapperEl.classList.add("todo-list__item-btns-wrapper");
  detailsBtnEl.classList.add("todo-list__item-btn", "details");
  editBtnEl.classList.add("todo-list__item-btn", "edit");
  deleteBtnEl.classList.add("todo-list__item-btn", "delete");
  priorityEl.classList.add(todoObj.priority);

  todoTitleEl.textContent = turncateString(todoObj.title, 50);
  priorityEl.textContent = titleCase(todoObj.priority);
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

  checkTodoWrapperEl.append(checkTodoEl);
  textsWrapperEl.append(checkTodoWrapperEl, todoTitleEl);
  if (!todoObj.isCompleted) textsWrapperEl.append(priorityEl);
  btnsWrapperEl.append(detailsBtnEl, editBtnEl, deleteBtnEl);
  todoBodyEl.append(todoDueEl, textsWrapperEl, btnsWrapperEl);
  todoContainerEl.append(todoBodyEl);
  return todoContainerEl;
};

export default Todo;
