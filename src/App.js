import Logo from "./components/Logo";
import Nav from "./components/Nav";
import NewTaskModal from "./components/NewTaskModal";
import { TodoListContainer } from "./components/TodoListContainer";
import { todosListAll } from "./components/TodosList";

const App = () => {
  const appContainerEl = document.createElement("div");
  const headerEl = document.createElement("header");
  const mainEl = document.createElement("main");
  const todosListContainerEl = TodoListContainer();
  const openModalBtn = document.createElement("button");

  openModalBtn.textContent = "add new todo";

  openModalBtn.addEventListener("click", () => {
    const newTaskModalEl = NewTaskModal();
    todosListContainerEl.append(newTaskModalEl);
    newTaskModalEl.showModal();
  });

  headerEl.append(Logo(), Nav());
  todosListContainerEl.append(todosListAll());
  mainEl.append(openModalBtn, todosListContainerEl);
  appContainerEl.append(headerEl, mainEl);

  return appContainerEl;
};

export default App;
