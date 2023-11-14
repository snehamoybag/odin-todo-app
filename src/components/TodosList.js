import {
  getAllTodos,
  getTodayTodos,
  listenUpdateTodosEvent,
} from "../scripts/todos";
import Todo from "./Todo";

const generateTodosListEl = (getTodosDataFunc) => {
  const listEl = document.createElement("ol");

  listEl.classList.add("todos");

  const renderTodos = () => {
    getTodosDataFunc().forEach((todoData) => {
      listEl.append(Todo(todoData));
    });
  };

  // render with Todo elements when appended to the DOM
  renderTodos();

  // rerender Todo element when todos data changes
  listenUpdateTodosEvent(() => {
    listEl.innerHTML = ""; // remove prev renders
    renderTodos();
  });

  return listEl;
};

export const todosListAll = () => generateTodosListEl(getAllTodos);

export const todosListToday = () => generateTodosListEl(getTodayTodos);
