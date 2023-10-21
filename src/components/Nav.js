import attributeAndClassSetter from "../scripts/attributeAndClassSetter";
import snakeCaseinator from "../scripts/snakeCaseinator";
import { showTodoFormDialogButtonEl } from "./TodoFormDialog";

const Nav = (swichTabFunc) => {
  const navEl = document.createElement("nav");
  const navListEl = document.createElement("ul");
  const linkTexts = ["All", "Today", "This Week", "Project", "Archive"];

  const listItemsWithLink = linkTexts.map((text) => {
    const liEl = document.createElement("li");
    const linkEl = document.createElement("a");

    attributeAndClassSetter(linkEl, {
      id: snakeCaseinator(text),
      class: "nav__link",
      href: "#",
    });

    linkEl.textContent = text;

    linkEl.addEventListener("click", () => {
      console.log(linkEl.id);
      swichTabFunc();
    });

    liEl.classList.add("nav__list-item");

    liEl.append(linkEl);

    return liEl;
  });

  attributeAndClassSetter(navEl, { id: "nav", class: "nav" });
  navListEl.classList.add("nav__list");

  navListEl.append(...listItemsWithLink);
  navEl.append(navListEl, showTodoFormDialogButtonEl);

  return navEl;
};

export default Nav;
