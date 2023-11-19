import { storeAndSyncData } from "./utilities";
import { getTodayDate, getWeekNumOfYear } from "./dates";

const todosKey = "todos";
let todos = [];

export const createTodoObj = (
  title,
  description,
  dueDate,
  dueTime,
  priority,
  inProject,
  isCompleted
) => ({
  title,
  description,
  dueDate,
  dueTime,
  priority,
  inProject,
  isCompleted,
});

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

export const getCompletedTodos = () =>
  todos.filter((todoObj) => todoObj.isCompleted);

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

export const updateTodoCompletionStatus = (todoObj) => {
  const updatedTodoObj = todoObj; // to ignore es-lint function parameter modification error
  const indexOfUpdatedTodoObj = todos.indexOf(todoObj);

  // chanege the status to true or false. set to true if it was false and vice-versa
  updatedTodoObj.isCompleted = !updatedTodoObj.isCompleted;

  // replace the original with the updated one
  if (indexOfUpdatedTodoObj >= 0) {
    todos.splice(indexOfUpdatedTodoObj, 1, updatedTodoObj);
    syncTodos();
  }
};

export const checkTodoEdit = (ogTodoObj, newTodoObj) => {
  const differences = Object.keys(ogTodoObj).filter((key) => {
    let isDifferent = false;
    // ignore the completion status while finding a difference in keys values
    if (key !== "isCompleted") isDifferent = ogTodoObj[key] !== newTodoObj[key];
    return isDifferent;
  });

  const isEdited = differences.length > 0;
  return isEdited;
};

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
