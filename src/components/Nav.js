import attributeAndClassSetter from "../scripts/attributeAndClassSetter";
import { showTodoFormDialogButtonEl } from "./TodoFormDialog";

const Nav = () => {
  const _createListItem = (childElType, childText, childProps) => {
    const liEl = document.createElement("li");
    const childEl = document.createElement(childElType);

    liEl.classList.add("nav__list-item");

    if (childText) childEl.textContent = childText;

    attributeAndClassSetter(childEl, childProps);

    liEl.append(childEl);

    return liEl;
  };

  const navEl = document.createElement("nav");
  const navListEl = document.createElement("ul");
  const navLinkTexts = ["All", "Today", "This Week", "Projects", "Archive"];
  const navItemsWithLinkEls = navLinkTexts.map((currentText) =>
    _createListItem("a", currentText, {
      class: "nav__link",
      href: "#",
    })
  );

  navEl.setAttribute("id", "nav");

  navEl.classList.add("nav");
  navListEl.classList.add("nav__list");

  navListEl.append(...navItemsWithLinkEls);
  navEl.append(navListEl, showTodoFormDialogButtonEl);

  return navEl;
};

export default Nav;
