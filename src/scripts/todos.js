import { storeAndSyncData } from "./utilities";
import { getTodayDate } from "./dates";

const todosKey = "todos";
let todos = [];

export const getAllTodos = () => todos;

export const getTodaysTodos = () =>
  todos.filter((todoObj) => {
    const todaysDate = getTodayDate();
    return todoObj.dueDate === todaysDate;
  });

const syncTodos = () => {
  todos = storeAndSyncData(todos, todosKey);
};

export const addTodo = (todoObj) => {
  todos.unshift(todoObj); // adds it at the beginning
  syncTodos();
};

export const deleteTodo = (deleteTodoObj) => {
  const indexOfDeleteTodoObj = todos.indexOf(deleteTodoObj);

  if (indexOfDeleteTodoObj >= 0) {
    todos.splice(indexOfDeleteTodoObj, 1);
    syncTodos();
  }
};

export const checkTodoEdit = (ogTodoObj, newTodoObj) => {
  const differences = Object.keys(ogTodoObj).filter(
    (key) => ogTodoObj[key] !== newTodoObj[key]
  );
  const isDifferenceFound = differences.length < 0;
  return isDifferenceFound;
};

export const createTodoObj = (
  title,
  description,
  dueDate,
  dueTime,
  priority,
  inProject
) => ({
  title,
  description,
  dueDate,
  dueTime,
  priority,
  inProject,
});

const updateTodosEventListenerEl = document.body;
const updateTodosEventName = "update-projects";

export const dispatchUpdateTodosEvent = () => {
  const customEvent = new Event(updateTodosEventName);
  updateTodosEventListenerEl.dispatchEvent(customEvent);
};

export const listenUpdateTodosEvent = (doStuffFunc) => {
  updateTodosEventListenerEl.addEventListener(
    updateTodosEventName,
    doStuffFunc
  );
};
