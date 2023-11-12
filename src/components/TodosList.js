import { getAllTodos, listenUpdateTodosEvent } from "../scripts/todos";
import Todo from "./Todo";

const _listElId = "todos-list";

const _getListEl = () => {
  const listEl = document.createElement("ol");
  listEl.id = _listElId;
  listEl.classList.add("todos");
  return listEl;
};

const _removePrevRender = () => {
  document.querySelector(`#${_listElId}`).innerHTML = "";
};

const _renderTodos = (todosDataList, containerEl) => {
  todosDataList.forEach((dataItem) => {
    containerEl.append(Todo(dataItem));
  });
};

export const allTodosList = () => {
  const listEl = _getListEl();
  const render = () => {
    _renderTodos(getAllTodos(), listEl);
  };

  // render when this function is called
  render();

  // re-render when todos data list is updated
  listenUpdateTodosEvent(() => {
    _removePrevRender();
    render();
  });

  return listEl;
};
