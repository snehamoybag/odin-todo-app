import { snakeCase, setElementProps } from "../scripts/utilities";
import { getDOMTodoListContainer } from "./TodoListContainer";
import { todosListAll, todosListToday, todoListThisWeek } from "./TodosList";
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
  const allLinkEl = getNavLinkItem("All");
  const todayLinkEl = getNavLinkItem("Today");
  const thisWeekLinkEl = getNavLinkItem("This Week");

  navEl.classList.add("nav");
  navListEl.classList.add("nav__list");

  allLinkEl.addEventListener("click", (e) =>
    renderNewTodoList(e, todosListAll())
  );

  todayLinkEl.addEventListener("click", (e) =>
    renderNewTodoList(e, todosListToday())
  );

  thisWeekLinkEl.addEventListener("click", (e) =>
    renderNewTodoList(e, todoListThisWeek())
  );

  navListEl.append(allLinkEl, todayLinkEl, thisWeekLinkEl, ProjectList());
  navEl.append(navListEl);

  return navEl;
};

export default Nav;
