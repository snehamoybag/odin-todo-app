import { snakeCase, setElementProps } from "../scripts/utilities";
import { getDOMTodoListContainer } from "./TodoListContainer";
import { todosListAll, todosListToday } from "./TodosList";

const Nav = () => {
  const renderNewTodoList = (event, todoLstEl) => {
    event.preventDefault();
    const DOMTodoListContainer = getDOMTodoListContainer();

    // remove prev renders
    DOMTodoListContainer.innerHTML = "";
    // render new todo list
    DOMTodoListContainer.append(todoLstEl);
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

  navListEl.append(allLinkEl, todayLinkEl, thisWeekLinkEl);
  navEl.append(navListEl);

  return navEl;
};

export default Nav;
