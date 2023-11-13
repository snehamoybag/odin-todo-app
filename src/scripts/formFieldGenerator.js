import { setElementProps } from "./utilities";

const getWrapperEl = () => {
  const wrapperEl = document.createElement("p");
  wrapperEl.classList.add("field-wrapper");
  return wrapperEl;
};

const getLabelEl = (text, forVal) => {
  const labelEl = document.createElement("label");
  labelEl.setAttribute("for", forVal);
  labelEl.textContent = text;
  return labelEl;
};

export const getFieldsetEl = (legendText, ...elms) => {
  const fieldsetEl = document.createElement("fieldset");
  const legendEl = document.createElement("legend");

  fieldsetEl.classList.add("fieldset");
  legendEl.textContent = legendText;

  fieldsetEl.append(legendEl, ...elms);

  return fieldsetEl;
};

export const inputField = (text, props) => {
  const wrapperEl = getWrapperEl();
  const inputEl = document.createElement("input");
  const labelEl = getLabelEl(text, props.id);

  setElementProps(inputEl, props);

  if (!props.checked) inputEl.removeAttribute("checked");

  wrapperEl.append(labelEl, inputEl);

  return wrapperEl;
};

export const textareaField = (text, props) => {
  const wrapperEl = getWrapperEl();
  const textareaEl = document.createElement("textarea");
  const labelEl = getLabelEl(text, props.id);

  setElementProps(textareaEl, props);
  textareaEl.value = props.value; // to make sure textarea is filled (if content available) when rendering

  wrapperEl.append(labelEl, textareaEl);

  return wrapperEl;
};

export const getOptionEl = (text, props) => {
  const optionEl = document.createElement("option");

  setElementProps(optionEl, props);

  if (!props) optionEl.setAttribute("value", text);

  optionEl.textContent = text;

  return optionEl;
};

export const selectField = (text, props, options, selectedOpt = "") => {
  const wrapperEl = getWrapperEl();
  const labelEl = getLabelEl(text, props.id);
  const selectInputEl = document.createElement("select");

  const optionEls = options.map((option, index) => {
    const optionEl = getOptionEl(option, {
      value: option,
    });

    if (selectedOpt === option) optionEl.setAttribute("selected", "");
    if (index === 0 && !selectedOpt) optionEl.setAttribute("selected", "");

    return optionEl;
  });

  setElementProps(selectInputEl, props);

  if (options.length === 0) {
    const placeholderOptEl = getOptionEl("--no option found--", {
      value: "",
      selected: "",
      disabled: "",
    });
    selectInputEl.append(placeholderOptEl);
  }

  selectInputEl.append(...optionEls);
  wrapperEl.append(labelEl, selectInputEl);

  return wrapperEl;
};
