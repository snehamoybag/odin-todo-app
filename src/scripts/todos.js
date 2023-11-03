import { storeAndSyncData } from "./utilities";

const _todosKey = "todos";
let _todos = [];

export const getTodos = () => _todos;

const _setTodos = () => {
  _todos = storeAndSyncData(_todos, _todosKey);
};

export const addTodo = (todoObj) => {
  _todos.unshift(todoObj); // adds it at the beginning
  _setTodos();
};

export const createTodoObj = (
  title,
  description,
  dueDate,
  dueTime,
  priority,
  inProject
) => {
  return {
    title,
    description,
    dueDate,
    dueTime,
    priority,
    inProject,
  };
};

const _removePrevRenderedTodos = (containerEl) => {
  containerEl.innerHTML = "";
};

export const renderAllTodos = (todoComponentFunc, outputEl) => {
  _removePrevRenderedTodos(outputEl);
  _todos.forEach((todoObj) => outputEl.append(todoComponentFunc(todoObj)));
};
