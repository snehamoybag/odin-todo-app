import { snakeCase, setElementProps } from "../scripts/utilities";
import { getDOMTodoListContainer } from "./TodoListContainer";
import {
  todosListAll,
  todosListToday,
  todoListThisWeek,
  todoListCompleted,
} from "./TodosList";
import ButtonHambuger from "./ButtonHamburger";
import ProjectList from "./ProjectList";

const Nav = () => {
  const renderNewTodoList = (event, todoListEl) => {
    event.preventDefault();
    const DOMTodoListContainer = getDOMTodoListContainer();

    // remove prev renders
    DOMTodoListContainer.innerHTML = "";
    // render new todo list
    DOMTodoListContainer.append(todoListEl);
  };

  const getNavLinkItem = (
    linkText,
    props = { id: snakeCase(linkText), class: "nav__link", href: "#" }
  ) => {
    const listItemEl = document.createElement("li");
    const anchorEl = document.createElement("a");

    listItemEl.classList.add("nav__item");
    setElementProps(anchorEl, props);
    anchorEl.textContent = linkText;

    listItemEl.append(anchorEl);

    return listItemEl;
  };

  const navEl = document.createElement("nav");
  const navListEl = document.createElement("ul");
  const navListElId = "todo-filter-list";
  const allLinkEl = getNavLinkItem("All");
  const todayLinkEl = getNavLinkItem("Today");
  const thisWeekLinkEl = getNavLinkItem("This Week");
  const completedLinkEl = getNavLinkItem("Completed");
  const hamburgerBtnEl = ButtonHambuger("Menu", navListElId);

  setElementProps(navEl, {
    class: "nav",
    "aria-label": "Header",
  });

  setElementProps(navListEl, {
    id: navListElId,
    role: "list",
    class: "nav__list",
    "data-state": "close", // used in css to show and hide the list. closed by default
  });

  allLinkEl.addEventListener("click", (e) =>
    renderNewTodoList(e, todosListAll())
  );

  todayLinkEl.addEventListener("click", (e) =>
    renderNewTodoList(e, todosListToday())
  );

  thisWeekLinkEl.addEventListener("click", (e) =>
    renderNewTodoList(e, todoListThisWeek())
  );

  completedLinkEl.addEventListener("click", (e) =>
    renderNewTodoList(e, todoListCompleted())
  );

  navListEl.append(
    allLinkEl,
    todayLinkEl,
    thisWeekLinkEl,
    ProjectList(),
    completedLinkEl
  );
  navEl.append(hamburgerBtnEl, navListEl);

  return navEl;
};

export default Nav;
