import logoImage from "../assets/logo.svg";
import Nav from "./Nav";

const Header = () => {
  const headerEl = document.createElement("header");
  const logoWrapperEl = document.createElement("div");
  const logoImg = new Image();
  const logoTextEl = document.createElement("h2");

  logoImg.src = logoImage;
  logoImg.alt = "Logo";

  logoWrapperEl.classList.add("logo");
  logoImg.classList.add("logo__img");
  logoTextEl.classList.add("logo__text");

  logoTextEl.textContent = "TODO APP";

  logoWrapperEl.append(logoImg, logoTextEl);
  headerEl.append(logoWrapperEl, Nav());

  return headerEl;
};

export default Header;
