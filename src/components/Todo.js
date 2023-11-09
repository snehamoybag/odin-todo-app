import { format } from "date-fns";
import { deleteTodo, dispatchUpdateTodosEvent } from "../scripts/todos";

const Todo = (todoObj) => {
  const todoContainerEl = document.createElement("li");
  const todoBodyEl = document.createElement("article");
  const textsWrapperEl = document.createElement("div");
  const todoTitleEl = document.createElement("h2");
  const todoDueEl = document.createElement("p");
  const btnsWrapperEl = document.createElement("div");
  const deleteBtnEl = document.createElement("button");

  todoTitleEl.textContent = todoObj.title;
  todoDueEl.textContent = `Due on ${format(
    new Date(Date.parse(`${todoObj.dueDate} ${todoObj.dueTime}`)),
    "do MMM',' yyyy 'at' h':'m aaa" // format its to i.e. 31st Jan, 2023 at 5pm
  )}`;
  deleteBtnEl.textContent = "Delete";

  deleteBtnEl.addEventListener("click", () => {
    deleteTodo(todoObj);
    dispatchUpdateTodosEvent();
  });

  textsWrapperEl.append(todoTitleEl, todoDueEl);
  btnsWrapperEl.append(deleteBtnEl);
  todoBodyEl.append(textsWrapperEl, btnsWrapperEl);
  todoContainerEl.append(todoBodyEl);
  return todoContainerEl;
};

export default Todo;
