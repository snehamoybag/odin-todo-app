import { kebabCase, setElementProps } from "../scripts/utilities";
import Logo from "./Logo";
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

  const getNavItem = () => {
    const liEl = document.createElement("li");
    liEl.classList.add("nav__list-item");
    return liEl;
  };

  const getNavLinkItem = (
    linkText,
    props = { id: kebabCase(linkText), class: "nav__link", href: "#" }
  ) => {
    const listItemEl = getNavItem();
    const anchorEl = document.createElement("a");

    setElementProps(anchorEl, props);
    anchorEl.textContent = linkText;

    listItemEl.append(anchorEl);

    return listItemEl;
  };

  const navEl = document.createElement("nav");
  const sidebarEl = document.createElement("div");
  const sidebarElId = "nav-sidebar";
  const navListEl = document.createElement("ul");
  const allLinkEl = getNavLinkItem("All");
  const todayLinkEl = getNavLinkItem("Today");
  const thisWeekLinkEl = getNavLinkItem("This Week");
  const completedLinkEl = getNavLinkItem("Completed");
  const hamburgerBtnEl = ButtonHambuger("Menu", sidebarElId);
  const projectsListItemEl = getNavItem();

  setElementProps(navEl, {
    class: "nav",
    "aria-label": "Header",
  });

  setElementProps(sidebarEl, {
    id: sidebarElId,
    class: "nav__sidebar",
    "data-state": "close", // used in css to show and hide the list. closed by default
  });

  setElementProps(navListEl, {
    role: "list",
    class: "nav__list",
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

  projectsListItemEl.append(ProjectList());
  navListEl.append(
    allLinkEl,
    todayLinkEl,
    thisWeekLinkEl,
    projectsListItemEl,
    completedLinkEl
  );
  sidebarEl.append(navListEl);
  navEl.append(hamburgerBtnEl, sidebarEl, Logo());

  return navEl;
};

export default Nav;
