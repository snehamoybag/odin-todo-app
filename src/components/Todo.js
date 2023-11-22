import { pascalCase } from "../scripts/utilities";
import { getFormatedDueDateAndTime } from "../scripts/dates";
import { deleteTodo, dispatchUpdateTodosEvent } from "../scripts/todos";
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
  const todoDueEl = document.createElement("p");
  const priorityEl = document.createElement("p");
  const btnsWrapperEl = document.createElement("div");
  const detailsBtnEl = document.createElement("button");
  const editBtnEl = document.createElement("button");
  const deleteBtnEl = document.createElement("button");

  todoContainerEl.classList.add("todo-list__item");
  checkTodoWrapperEl.classList.add("todo-list__item-checkbox-wrapper");
  checkTodoEl.classList.add("todo-list__item-checkbox");
  todoTitleEl.classList.add("todo-list__item-title");
  priorityEl.classList.add("tod-list__item-priority");
  todoDueEl.classList.add("todo-list__item-due-date");
  textsWrapperEl.classList.add("todo-list__item-texts-wrapper");
  btnsWrapperEl.classList.add("todo-list__item-btns-wrapper");

  todoTitleEl.textContent = todoObj.title;
  priorityEl.textContent = pascalCase(todoObj.priority);
  todoDueEl.textContent = getFormatedDueDateAndTime(
    Date.parse(`${todoObj.dueDate} ${todoObj.dueTime}`)
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

  checkTodoWrapperEl.append(checkTodoEl);
  textsWrapperEl.append(checkTodoWrapperEl, todoTitleEl, priorityEl);
  btnsWrapperEl.append(detailsBtnEl, editBtnEl, deleteBtnEl);
  todoBodyEl.append(todoDueEl, textsWrapperEl, btnsWrapperEl);
  todoContainerEl.append(todoBodyEl);
  return todoContainerEl;
};

export default Todo;
