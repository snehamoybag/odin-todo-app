import {
  getAllTodos,
  getTodaysTodos,
  listenUpdateTodosEvent,
} from "../scripts/todos";
import Todo from "./Todo";

const listElId = "todos-list";

const getListEl = () => {
  const listEl = document.createElement("ol");
  listEl.id = listElId;
  listEl.classList.add("todos");
  return listEl;
};

const removePrevRender = () => {
  document.querySelector(`#${listElId}`).innerHTML = "";
};

const renderTodos = (todosDataList, containerEl) => {
  todosDataList.forEach((dataItem) => {
    containerEl.append(Todo(dataItem));
  });
};

export const allTodosList = () => {
  const listEl = getListEl();
  const render = () => {
    renderTodos(getAllTodos(), listEl);
  };

  // render when this function is called
  render();

  // re-render when todos data list is updated
  listenUpdateTodosEvent(() => {
    removePrevRender();
    render();
  });

  return listEl;
};

export const todaysTodo = () => {
  const listEl = getListEl();
  const render = () => {
    renderTodos(getTodaysTodos(), listEl);
  };

  render();

  listenUpdateTodosEvent(() => {
    removePrevRender();
    render();
  });

  return listEl;
};
