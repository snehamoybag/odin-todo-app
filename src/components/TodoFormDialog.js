import {
  createInputField,
  createTextareaField,
} from "../scripts/formFieldsGenerator";
import attributeAndClassSetter from "../scripts/attributeAndClassSetter";
import { addATodo } from "../scripts/Todo";

const TodoFormDialog = () => {
  const _createATodoObj = (formEl) => {
    const allFields = formEl.querySelectorAll("[name]"); // gets all fields that has a name attribute
    const todoObj = {};

    allFields.forEach((field) => {
      todoObj[field.name] = field.value;
    });

    return todoObj;
  };

  const _buttonElGenerator = (text, props) => {
    const buttonEl = document.createElement("button");

    if (text) buttonEl.textContent = text;
    attributeAndClassSetter(buttonEl, props);

    return buttonEl;
  };

  const todoFormDialogEl = document.createElement("dialog");
  const dialogTitleEl = document.createElement("h2");
  const formEl = document.createElement("form");
  const titleField = createInputField("Title", {
    type: "text",
    id: "todo-title",
    name: "todo-title",
    required: true,
  });
  const descriptionField = createTextareaField("Description", {
    id: "todo-description",
    name: "todo-description",
    required: true,
  });
  const btnWrapperEl = document.createElement("div");
  const addBtnEl = _buttonElGenerator("Add Task", {
    type: "submit",
    id: "add-task-btn",
    class: ["btn", "btn--submit"],
  });
  const cancelBtnEl = _buttonElGenerator("Cancel", {
    type: "button",
    class: ["btn", "btn--cancel"],
  });
  const showTodoFormDialogButtonEl = _buttonElGenerator("Create A New Task", {
    type: "button",
    id: "open-todo-form-dialog-btn",
    class: ["btn", "btn--open-todo-form-dialog"],
  });

  formEl.setAttribute("id", "todo-form");

  todoFormDialogEl.classList.add("todo-dialog");
  dialogTitleEl.classList.add("todo-dialog__title");
  formEl.classList.add("todo-form");
  btnWrapperEl.classList.add("todo-form__btn-wrapper");

  dialogTitleEl.textContent = "Create A New Task";

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    addATodo(_createATodoObj(formEl));
    todoFormDialogEl.close();
    formEl.reset(); //  emptyies out all the form fields
  });

  cancelBtnEl.addEventListener("click", () => {
    todoFormDialogEl.close();
    formEl.reset();
  });

  showTodoFormDialogButtonEl.addEventListener("click", () =>
    todoFormDialogEl.showModal()
  );

  btnWrapperEl.append(addBtnEl, cancelBtnEl);
  formEl.append(titleField, descriptionField, btnWrapperEl);
  todoFormDialogEl.append(dialogTitleEl, formEl);

  return {
    todoFormDialogEl,
    showTodoFormDialogButtonEl,
  };
};

export const { todoFormDialogEl, showTodoFormDialogButtonEl } =
  TodoFormDialog();
