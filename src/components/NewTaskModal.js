import {
  fieldsetEl,
  inputField,
  textareaField,
  selectField,
} from "../scripts/formFieldGenerator";
import { createTodoObj, addTodo, renderAllTodos } from "../scripts/todos";
import { getProjects } from "../scripts/projects";
import { getTodayDate } from "../scripts/dates";
import { snakeCase } from "../scripts/utilities";
import { todosContainerId } from "./TodosContainer";
import Todo from "./Todo";

const NewTaskModal = (
  title = "",
  description = "",
  dueDate = "",
  dueTime = "",
  priority = ""
) => {
  const modalEl = document.createElement("dialog");
  const formEl = document.createElement("form");
  const formHeaderEl = document.createElement("h2");

  const titleField = inputField("Title", {
    type: "text",
    id: "title",
    name: "todo-title",
    value: title,
    required: true,
  });
  const descriptionField = textareaField("Description", {
    id: "description",
    name: "todo-description",
    value: description,
    required: true,
  });

  const dueDateField = inputField("Date", {
    type: "date",
    id: "due-date",
    name: "todo-due-date",
    min: getTodayDate(),
    value: dueDate || getTodayDate(),
    required: true,
  });
  const dueTimeField = inputField("Time", {
    type: "time",
    id: "due-time",
    name: "todo-due-time",
    value: dueTime || "23:59",
    required: true,
  });
  const dueDateAndTimeFieldsGroup = fieldsetEl(
    "Set Due Date & Time",
    dueDateField,
    dueTimeField
  );

  const priorityRadioEls = ["Low", "Mid", "High"].map((inputName) => {
    return inputField(inputName, {
      type: "radio",
      id: `todo-priority-${snakeCase(inputName)}`,
      name: "todo-priority",
      value: snakeCase(inputName),
      checked: snakeCase(inputName) === priority,
      required: true,
    });
  });
  const priorityFieldsGroup = fieldsetEl("Set Priority", ...priorityRadioEls);

  const projectSelectField = selectField(
    "Select a Project",
    {
      id: "project",
      name: "todo-project",
    },
    getProjects()
  );
  const newprojectBtnEl = document.createElement("button");
  const projectSelectFieldsGroup = fieldsetEl(
    "Add Task To A Project",
    projectSelectField,
    newprojectBtnEl
  );

  const btnsWrapperEl = document.createElement("div");
  const submitBtnEl = document.createElement("button");
  const cancelBtnEl = document.createElement("button");

  modalEl.classList.add("form-modal");
  formEl.classList.add("form-modal__form");
  formHeaderEl.classList.add("form-modal__title");
  btnsWrapperEl.classList.add("form-modal__btn-wrapper");
  newprojectBtnEl.classList.add("btn", "btn--new-project");
  submitBtnEl.classList.add("btn", "btn--submit");
  cancelBtnEl.classList.add("btn", "btn--cancel");

  newprojectBtnEl.setAttribute("type", "button");
  submitBtnEl.setAttribute("type", "submit");
  cancelBtnEl.setAttribute("type", "button");

  formHeaderEl.textContent = title ? "Edit Task" : "Create a New Task";
  newprojectBtnEl.textContent = "Create A New Project";
  submitBtnEl.textContent = title ? "Done" : "Create";
  cancelBtnEl.textContent = "Cancel";

  const closeAndRemoveFormModal = () => {
    modalEl.close();
    modalEl.remove(); // removes it from DOM
  };

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskTitle = titleField.querySelector("input").value;
    const taskDescription = descriptionField.querySelector("textarea").value;
    const taskDueDate = dueDateField.querySelector("input").value;
    const taskDueTime = dueTimeField.querySelector("input").value;
    const taskPriority = priorityField.querySelector(
      "input[name=todo-priority]:checked"
    ).value;
    const task = createTodoObj(
      taskTitle,
      taskDescription,
      taskDueDate,
      taskDueTime,
      taskPriority
    );

    console.log(task);
    addTodo(task);
    closeAndRemoveFormModal();
    renderAllTodos(Todo, document.querySelector(`#${todosContainerId}`));
  });

  cancelBtnEl.addEventListener("click", () => {
    closeAndRemoveFormModal();
  });

  modalEl.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalEl.hasAttribute("open")) {
      closeAndRemoveFormModal();
    }
  });

  btnsWrapperEl.append(submitBtnEl, cancelBtnEl);
  formEl.append(
    formHeaderEl,
    titleField,
    descriptionField,
    dueDateAndTimeFieldsGroup,
    priorityFieldsGroup,
    projectSelectFieldsGroup,
    btnsWrapperEl
  );
  modalEl.append(formEl);

  return modalEl;
};

export default NewTaskModal;
