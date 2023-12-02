import { compareAsc } from "date-fns";
import { storeAndSyncData } from "./utilities";
import { getTodayDate, getWeekNumOfYear } from "./dates";

const todosKey = "todos";
let todos = [
  {
    title: "todo 1",
    description: "bruh",
    dueDate: "2023-11-21",
    dueTime: "05:30",
    priority: "high",
    inProject: "Project 1",
    isCompleted: false,
  },
  {
    title: "todo 2",
    description: "bruh",
    dueDate: "2023-11-21",
    dueTime: "06:30",
    priority: "low",
    inProject: "Project 2",
    isCompleted: false,
  },
  {
    title: "todo 3",
    description: "bruh",
    dueDate: "2023-11-21",
    dueTime: "11:30",
    priority: "mid",
    inProject: "Project 3",
    isCompleted: false,
  },
];

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
      Date.parse(`${todoObj.dueDate} ${todoObj.dueTime}`)
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

export const deleteTodosInProject = (projectName) => {
  todos.filter((todoObj) => todoObj.inProject !== projectName);
  syncTodos();
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

let activeSortingOption = "Newest to Oldest"; // default value

export const getActiveSortingOption = () => activeSortingOption;
export const setActiveSortingOption = (newOption) => {
  activeSortingOption = newOption;
};

export const sortDueDate = (todosArr) => {
  const clonedTodosArr = [...todosArr]; // since Array.sort() mutates the original array

  return clonedTodosArr.sort((a, b) =>
    compareAsc(
      Date.parse(a.dueDate, a.dueTime),
      Date.parse(b.dueDate, b.dueTime)
    )
  );
};

export const sortPriority = (todosArr, sortingOrder) => {
  const getPriorityValue = (priority) => {
    const priorityValues = {
      high: 2,
      mid: 1,
      low: 0,
    };

    return priorityValues[priority];
  };

  const clonedArr = [...todosArr];
  const priorityLowToHighTodos = clonedArr.sort(
    (a, b) => getPriorityValue(a.priority) - getPriorityValue(b.priority)
  );
  const priorityHighToLowTodos = [...priorityLowToHighTodos].reverse(); // since Array.reserve() mutates original array

  if (sortingOrder.toLowerCase() === "high") return priorityHighToLowTodos;
  if (sortingOrder.toLowerCase() === "low") return priorityLowToHighTodos;
  return null; // anything else
};

export const sortNewestToOldest = (todosArr) => todosArr; // todos are sorted newest to oldest by default

export const sortOldestToNewest = (todosArr) => {
  const clonedTodosArr = [...todosArr]; // since Array.reverse() mutates the original array
  return clonedTodosArr.reverse();
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
