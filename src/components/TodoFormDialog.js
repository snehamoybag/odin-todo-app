import {
  createInputField,
  createTextareaField,
} from "../scripts/formFieldsGenerator";

const TodoForm = () => {
  const dialogEl = document.createElement("dialog");
  const dialogTitleEl = document.createElement("h2");
  const formEl = document.createElement("form");
  const titleField = createInputField("Title", {
    type: "text",
    id: "todo-title",
    name: "todo-title",
  });
  const textareaField = createTextareaField("Description", {
    id: "todo-description",
    name: "todo-description",
  });
  const btnWrapperEl = document.createElement("div");
  const addBtnEl = document.createElement("button");
  const cancelBtnEl = document.createElement("button");

  formEl.setAttribute("id", "todo-form");
  addBtnEl.setAttribute("type", "submit");
  cancelBtnEl.setAttribute("type", "button");

  dialogEl.classList.add("todo-dialog");
  dialogTitleEl.classList.add("todo-dialog__title");
  formEl.classList.add("todo-form");
  btnWrapperEl.classList.add("todo-form__btn-wrapper");
  addBtnEl.classList.add("btn", "btn--submit");
  cancelBtnEl.classList.add("btn", "btn--cancel");

  dialogTitleEl.textContent = "Create A New Task";
  addBtnEl.textContent = "Add Task";
  cancelBtnEl.textContent = "Cancel";

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    // add todo func here
    dialogEl.close();
    formEl.reset(); //  emptyies out all the form fields
  });

  cancelBtnEl.addEventListener("click", () => {
    dialogEl.close();
    formEl.reset();
  });

  btnWrapperEl.append(addBtnEl, cancelBtnEl);
  formEl.append(titleField, textareaField, btnWrapperEl);
  dialogEl.append(dialogTitleEl, formEl);

  return dialogEl;
};

export default TodoForm;
