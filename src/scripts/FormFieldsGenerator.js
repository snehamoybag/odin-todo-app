import attributeAndClassSetter from "./attributeAndClassSetter";

// generates form fields with its wrappers and label
const FormFieldsGenerator = () => {
  const _createWrapperEl = () => {
    const wrapperEl = document.createElement("p");

    wrapperEl.classList.add("input-wrapper");

    return wrapperEl;
  };

  const _createLabelEl = (id, text) => {
    const labelEl = document.createElement("label");

    if (id) labelEl.setAttribute("for", id);
    if (text) labelEl.textContent = text;

    labelEl.classList.add("input-label");

    return labelEl;
  };

  const createInputField = (labelText, props) => {
    const wrapperEl = _createWrapperEl();
    const labelEl = _createLabelEl(props.id, labelText);
    const inputEl = document.createElement("input");

    // input type to text by default, if type is not specified
    if (!props.type) inputEl.setAttribute("type", "text");

    attributeAndClassSetter(inputEl, props);

    wrapperEl.append(labelEl, inputEl);

    return wrapperEl;
  };

  const createTextareaField = (labelText, props) => {
    const wrapperEl = _createWrapperEl();
    const labelEl = _createLabelEl(props.id, labelText);

    const textareaEl = document.createElement("textarea");

    attributeAndClassSetter(textareaEl, props);

    wrapperEl.append(labelEl, textareaEl);

    return wrapperEl;
  };

  return {
    createInputField,
    createTextareaField,
  };
};

export const { createInputField, createTextareaField } = FormFieldsGenerator();
