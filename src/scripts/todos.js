import { storeAndSyncData } from "./utilities";
import { getTodayDate, getWeekNumOfYear } from "./dates";

const todosKey = "todos";
let todos = [];

export const getAllTodos = () => todos;

export const getTodayTodos = () =>
  todos.filter((todoObj) => {
    const todaysDate = getTodayDate();
    return todoObj.dueDate === todaysDate;
  });

export const getThisWeekTodo = () =>
  todos.filter((todoObj) => {
    const currentWeekNum = getWeekNumOfYear(new Date());
    const weekNumOfDueDate = getWeekNumOfYear(
      Date.parse(todoObj.dueDate, todoObj.dueTime)
    );
    return weekNumOfDueDate === currentWeekNum;
  });

export const getTodosByProjectName = (projectName) =>
  todos.filter((todoObj) => todoObj.inProject === projectName);

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
  const isEdited = differences.length > 0;
  return isEdited;
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
