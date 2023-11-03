import { format } from "date-fns";

const Todo = (todoObj) => {
  const todoContainerEl = document.createElement("li");
  const todoBodyEl = document.createElement("article");
  const todoTitleEl = document.createElement("h2");
  const todoDueEl = document.createElement("p");

  todoTitleEl.textContent = todoObj.title;
  todoDueEl.textContent = `Due on ${format(
    new Date(...todoObj.dueDate.split("-"), ...todoObj.dueTime.split(":")),
    "do MMM',' yyyy 'at' h':'m aaa" // format its to i.e. 31st Jan, 2023 at 5pm
  )}`;

  todoBodyEl.append(todoTitleEl, todoDueEl);
  todoContainerEl.append(todoBodyEl);
  return todoContainerEl;
};

export default Todo;
