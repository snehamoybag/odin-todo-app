import { snakeCase, setElementProps } from "../scripts/utilities";

const Nav = () => {
  const navEl = document.createElement("nav");
  const navListEl = document.createElement("ul");

  navEl.classList.add("nav");
  navListEl.classList.add("nav__list");

  const createNavLinkEl = (
    linkText,
    props = { id: snakeCase(linkText), class: "nav__link", href: "#" }
  ) => {
    const linkEl = document.createElement("a");

    setElementProps(linkEl, props);
    linkEl.textContent = linkText;

    return linkEl;
  };

  const addToNavList = (el) => {
    const litstItemEl = document.createElement("li");

    litstItemEl.classList.add("nav__list_item");

    litstItemEl.append(el);
    navListEl.append(litstItemEl);
  };

  // create and add tab links to nav list
  const listOfTabNames = ["All", "Today", "This Week", "Completed", "Archive"];

  listOfTabNames.forEach((tabName) => {
    const linkEl = createNavLinkEl(tabName);
    addToNavList(linkEl);
  });

  navEl.append(navListEl);

  return navEl;
};

export default Nav;
