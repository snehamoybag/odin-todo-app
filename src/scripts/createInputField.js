// generates inputs with label and wrapper
// generates text inputs by default

const createInputField = (labelText, props) => {
  const wrapperEl = document.createElement("p");
  const labelEl = document.createElement("label");
  const inputEl = document.createElement("input");

  if (props.id) labelEl.setAttribute("for", props.id);
  if (labelText) labelEl.textContent = labelText;

  wrapperEl.classList.add("input-wrapper");
  labelEl.classList.add("input-label");

  // input type to text if type is not specified
  if (!props.type) inputEl.setAttribute("type", "text");

  // set classes and attributes on the input element
  for (const key in props) {
    const value = props[key];

    if (key === "class" && Array.isArray(value)) {
      inputEl.classList.add(...value);
    } else if (key === "class" && !Array.isArray(value)) {
      inputEl.classList.add(value);
    } else if (key !== "class") {
      inputEl.setAttribute(key, value);
    }
  }

  wrapperEl.append(labelEl, inputEl);

  return wrapperEl;
};

export default createInputField;
