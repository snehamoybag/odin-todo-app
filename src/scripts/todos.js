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

export const Todo = (title, description, priority, dueDate, inProject) => {
  this.title = title;
  this.description = description;
  this.priority = priority;
  this.dueDate = dueDate;
  this.inProject = inProject;
};
