import { setElementProps } from "./utilities";

const _getWrapperEl = () => {
  const wrapperEl = document.createElement("p");
  wrapperEl.classList.add("field-wrapper");
  return wrapperEl;
};

const _getLabelEl = (text, forVal) => {
  const labelEl = document.createElement("label");
  labelEl.setAttribute("for", forVal);
  labelEl.textContent = text;
  return labelEl;
};

export const fieldsetEl = (legendText, ...elms) => {
  const fieldsetEl = document.createElement("fieldset");
  const legendEl = document.createElement("legend");

  fieldsetEl.classList.add("fieldset");
  legendEl.textContent = legendText;

  fieldsetEl.append(legendEl, ...elms);

  return fieldsetEl;
};

export const inputField = (text, props) => {
  const wrapperEl = _getWrapperEl();
  const inputEl = document.createElement("input");
  const labelEl = _getLabelEl(text, props.id);

  setElementProps(inputEl, props);

  if (!props.checked) inputEl.removeAttribute("checked");

  wrapperEl.append(labelEl, inputEl);

  return wrapperEl;
};

export const textareaField = (text, props) => {
  const wrapperEl = _getWrapperEl();
  const textareaEl = document.createElement("textarea");
  const labelEl = _getLabelEl(text, props.id);

  setElementProps(textareaEl, props);

  wrapperEl.append(labelEl, textareaEl);

  return wrapperEl;
};

export const selectField = (text, props, options, selectedOpt = "") => {
  const wrapperEl = _getWrapperEl();
  const labelEl = _getLabelEl(text, props.id);
  const selectInputEl = document.createElement("select");
  const placeHolderOptionEl = document.createElement("option");
  const optionEls = options.map((option) => {
    const optionEl = document.createElement("option");

    optionEl.setAttribute("value", option);
    if (selectedOpt === option) {
      optionEl.setAttribute("selected", "");
    }

    optionEl.textContent = option;

    return optionEl;
  });

  setElementProps(selectInputEl, props);

  placeHolderOptionEl.setAttribute("value", "");
  if (!selectedOpt) placeHolderOptionEl.setAttribute("selected", "");
  placeHolderOptionEl.setAttribute("disabled", "");

  placeHolderOptionEl.textContent =
    options.length > 0 ? "--Please Select One--" : "--No option found--";

  selectInputEl.append(placeHolderOptionEl, ...optionEls);
  wrapperEl.append(labelEl, selectInputEl);

  return wrapperEl;
};
