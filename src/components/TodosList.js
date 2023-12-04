import {
  getAllTodos,
  getTodayTodos,
  getThisWeekTodo,
  getCompletedTodos,
  getActiveSortingOption,
  sortDueDate,
  sortPriority,
  sortNewestToOldest,
  sortOldestToNewest,
  getTodosByProjectName,
  listenUpdateTodosEvent,
} from "../scripts/todos";
import EmptyTodo from "./EmptyTodo";
import Todo from "./Todo";

const generateTodosListEl = (getTodosDataFunc) => {
  const listEl = document.createElement("ol");
  listEl.classList.add("todo-list");

  const getSortedTodos = () => {
    const todos = getTodosDataFunc();
    const activeSortingOption = getActiveSortingOption();
    let sortedTodos = todos; // default

    switch (activeSortingOption) {
      case "Priority: High to Low":
        sortedTodos = sortPriority(todos, "high");
        break;
      case "Priority: Low to High":
        sortedTodos = sortPriority(todos, "low");
        break;
      case "Due Date":
        sortedTodos = sortDueDate(todos);
        break;
      case "Oldest to Newest":
        sortedTodos = sortOldestToNewest(todos);
        break;
      default:
        sortedTodos = sortNewestToOldest(todos);
        break;
    }

    return sortedTodos;
  };

  const renderTodos = () => {
    const sortedTodos = getSortedTodos();
    const isTodoListEmpty = sortedTodos.length <= 0;

    if (isTodoListEmpty) {
      listEl.append(EmptyTodo());
    } else {
      getSortedTodos().forEach((todoObj) => {
        listEl.append(Todo(todoObj));
      });
    }
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

export const todoListThisWeek = () => generateTodosListEl(getThisWeekTodo);

export const todoListInProject = (projectName) =>
  generateTodosListEl(() => getTodosByProjectName(projectName));

export const todoListCompleted = () => generateTodosListEl(getCompletedTodos);
