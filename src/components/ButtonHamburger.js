import { setElementProps } from "../scripts/utilities";

const ButtonHambuger = (btnText, controlledElId) => {
  const buttonEl = document.createElement("button");
  const srOnlyEl = document.createElement("span");
  const buttonLinesEl = document.createElement("span");

  setElementProps(buttonEl, {
    type: "button",
    "aria-controls": controlledElId,
    "aria-expanded": false, // controlled element hidden by default
    class: ["btn", "btn--hamburger"],
  });

  srOnlyEl.classList.add("sr-only");
  buttonLinesEl.classList.add("btn--hamburger_lines");

  srOnlyEl.textContent = btnText;

  buttonEl.addEventListener("click", () => {
    const controlledDOMEl = document.querySelector(`#${controlledElId}`);
    const isAriaExpanded = buttonEl.ariaExpanded === "true"; // since .ariaExpanded returns a string, not a boolean

    if (isAriaExpanded) {
      // hide the controlled element if it was shown
      controlledDOMEl.dataset.state = "close"; // used in css to show/hide the element using the dataset attrribute
      buttonEl.ariaExpanded = false;
    } else {
      // show the controlled element if it was closed
      controlledDOMEl.dataset.state = "open";
      buttonEl.ariaExpanded = true;
    }
  });

  buttonEl.append(srOnlyEl, buttonLinesEl);

  return buttonEl;
};

export default ButtonHambuger;
