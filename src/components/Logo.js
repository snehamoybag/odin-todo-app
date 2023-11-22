import logoUrl from "../assets/logo.svg";

const Logo = () => {
  const logoContainerEl = document.createElement("div");
  const logoImg = new Image();
  const logoTextEl = document.createElement("h2");

  logoContainerEl.classList.add("logo");
  logoImg.classList.add("logo__img");
  logoTextEl.classList.add("logo__text");

  logoImg.src = logoUrl;
  logoImg.alt = "Logo";

  logoTextEl.textContent = "Todo App";

  logoContainerEl.append(logoTextEl, logoImg);

  return logoContainerEl;
};

export default Logo;
