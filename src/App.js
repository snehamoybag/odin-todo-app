import { setElementProps } from "./scripts/utilities";
import Nav from "./components/Nav";
import NewTaskModal from "./components/NewTaskModal";
import SortTodos from "./components/SortTodos";
import { TodoListContainer } from "./components/TodoListContainer";
import { todosListAll } from "./components/TodosList";

const App = () => {
  const appContainerEl = document.createElement("div");
  const headerEl = document.createElement("header");
  const mainEl = document.createElement("main");
  const newTaskBtnEl = document.createElement("button");
  const srOnlyEl = document.createElement("span");
  const todosListContainerEl = TodoListContainer();

  headerEl.classList.add("header");
  setElementProps(newTaskBtnEl, {
    type: "button",
    title: "Add A New Task",
    class: "btn-new-task",
  });
  srOnlyEl.classList.add("sr-only");

  srOnlyEl.textContent = "Add A New Task";

  newTaskBtnEl.addEventListener("click", () => {
    const newTaskModalEl = NewTaskModal();
    mainEl.append(newTaskModalEl);
    newTaskModalEl.showModal();
  });

  headerEl.append(Nav());
  todosListContainerEl.append(todosListAll());
  newTaskBtnEl.append(srOnlyEl);
  mainEl.append(newTaskBtnEl, SortTodos(), todosListContainerEl);
  appContainerEl.append(headerEl, mainEl);

  return appContainerEl;
};

export default App;
