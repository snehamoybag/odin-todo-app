import { storeAndSyncData } from "./utilities";

const _todosKey = "todos";
let _todos = [];

export const getAllTodos = () => _todos;

const _syncTodos = () => {
  _todos = storeAndSyncData(_todos, _todosKey);
};

export const addTodo = (todoObj) => {
  _todos.unshift(todoObj); // adds it at the beginning
  _syncTodos();
};

export const deleteTodo = (deleteTodoObj) => {
  const indexOfDeleteTodoObj = _todos.indexOf(deleteTodoObj);

  if (indexOfDeleteTodoObj >= 0) {
    _todos.splice(indexOfDeleteTodoObj, 1);
    _syncTodos();
  }
};

export const checkTodoEdit = (ogTodoObj, newTodoObj) => {
  let isDifferenceFound = false;
  // check for values difference
  for (const key in ogTodoObj) {
    if (ogTodoObj[key] !== newTodoObj[key]) {
      isDifferenceFound = true;
      return isDifferenceFound;
    }
  }
  // runns only if loop ends, loop ends when no difference is found
  isDifferenceFound = false;
  return isDifferenceFound;
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

const _updateTodosEventListenerEl = document.body;
const _updateTodosEventName = "update-projects";

export const dispatchUpdateTodosEvent = () => {
  const customEvent = new Event(_updateTodosEventName);
  _updateTodosEventListenerEl.dispatchEvent(customEvent);
};

export const listenUpdateTodosEvent = (doStuffFunc) => {
  _updateTodosEventListenerEl.addEventListener(
    _updateTodosEventName,
    doStuffFunc
  );
};
