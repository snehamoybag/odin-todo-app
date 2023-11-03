import Logo from "./components/Logo";
import Nav from "./components/Nav";
import FormModal from "./components/FormModal";
import { TodosContainer } from "./components/TodosContainer";

const App = () => {
  const appContainerEl = document.createElement("div");
  const headerEl = document.createElement("header");
  const mainEl = document.createElement("main");
  const openModalBtn = document.createElement("button");

  openModalBtn.textContent = "add new todo";

  openModalBtn.addEventListener("click", () => {
    const formModalEl = FormModal();
    mainEl.append(formModalEl);
    formModalEl.showModal();
  });

  headerEl.append(Logo(), Nav());
  mainEl.append(openModalBtn, TodosContainer());
  appContainerEl.append(headerEl, mainEl);

  return appContainerEl;
};

export default App;
