// creates text area field with label and their wrapper

const createTextareaField = (labelText, props) => {
  const wrapperEl = document.createElement("p");
  const labelEl = document.createElement("label");
  const textareaEl = document.createElement("textarea");

  if (props.id) labelEl.setAttribute("for", props.id);
  if (labelText) labelEl.textContent = labelText;

  wrapperEl.classList.add("input-wrapper");
  labelEl.classList.add("input-label");

  for (const key in props) {
    const value = props[key];

    // add classes and attributes to textarea element
    if (key === "class" && Array.isArray(value)) {
      textareaEl.classList.add(...value);
    } else if (key === "class" && !Array.isArray(value)) {
      textareaEl.classList.add(value);
    } else if (key !== "class") {
      textareaEl.setAttribute(key, value);
    }
  }

  wrapperEl.append(labelEl, textareaEl);

  return wrapperEl;
};

export default createTextareaField;
