import { setElementProps } from "./utilities";

const getWrapperEl = () => {
  const wrapperEl = document.createElement("p");
  wrapperEl.classList.add("field-wrapper");
  return wrapperEl;
};

export const inputField = (text, props) => {
  const wrapperEl = getWrapperEl();
  const inputEl = document.createElement("input");
  const labelEl = document.createElement("label");

  setElementProps(inputEl, props);

  if (props.id) labelEl.setAttribute("for", props.id);
  if (text) labelEl.textContent = text;

  wrapperEl.append(labelEl, inputEl);

  return wrapperEl;
};

export const textareaField = (text, props) => {
  const wrapperEl = getWrapperEl();
  const textareaEl = document.createElement("textarea");
  const labelEl = document.createElement("label");

  setElementProps(textareaEl, props);

  if (props.id) labelEl.setAttribute("for", props.id);
  if (text) labelEl.textContent = text;

  wrapperEl.append(labelEl, textareaEl);

  return wrapperEl;
};
