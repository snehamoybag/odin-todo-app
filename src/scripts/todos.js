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
  priority,
  dueDate,
  inProject
) => {
  return {
    title,
    description,
    priority,
    dueDate,
    inProject,
  };
};
