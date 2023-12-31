import {
  getFieldsetEl,
  inputField,
  textareaField,
  getOptionEl,
  selectField,
} from "./FormFields";
import {
  createTodoObj,
  addTodo,
  deleteTodo,
  checkTodoEdit,
  dispatchUpdateTodosEvent,
} from "../scripts/todos";
import { getProjects, listenUpdateProjectsEvent } from "../scripts/projects";
import { getTodayDate } from "../scripts/dates";
import { kebabCase, closeAndRemoveModal } from "../scripts/utilities";
import NewProjectModal from "./NewProjectModal";

const NewTaskModal = (todoObj = {}) => {
  // destructure the props with default values from todoObj
  // default values are only applied when a property is 'undefined'
  const {
    title = "",
    description = "",
    dueDate = "",
    dueTime = "",
    priority = "",
    inProject = "",
    isCompleted = false,
  } = todoObj;

  const taskModalEl = document.createElement("dialog");
  const formEl = document.createElement("form");
  const formHeaderEl = document.createElement("h2");
  const formFieldContainerEl = document.createElement("div");

  const titleField = inputField("Title", {
    type: "text",
    id: "title",
    name: "todo-title",
    value: title,
    maxLength: 80,
    required: true,
  });
  const descriptionField = textareaField("Description", {
    id: "description",
    name: "todo-description",
    value: description,
    maxLength: 900,
    required: true,
  });

  const dueDateField = inputField("Date", {
    type: "date",
    id: "due-date",
    name: "todo-due-date",
    min: getTodayDate(),
    value: dueDate || getTodayDate(),
    pattern: /\d{4}-\d{2}-\d{2}/.source, // to make sure, user inputs in correct format
    required: true,
  });
  const dueTimeField = inputField("Time", {
    type: "time",
    id: "due-time",
    name: "todo-due-time",
    value: dueTime || "23:59",
    required: true,
  });
  const dueDateAndTimeFieldsGroup = getFieldsetEl(
    "Set Due Date & Time",
    dueDateField,
    dueTimeField
  );

  const priorityRadioEls = ["Low", "Mid", "High"].map((inputName) =>
    inputField(inputName, {
      type: "radio",
      id: `todo-priority-${kebabCase(inputName)}`,
      name: "todo-priority",
      value: kebabCase(inputName),
      checked: kebabCase(inputName) === priority,
      required: true,
    })
  );
  const priorityFieldsGroup = getFieldsetEl(
    "Set Priority",
    ...priorityRadioEls
  );

  const projectSelectField = selectField(
    "Select a Project",
    {
      id: "in-project",
      name: "todo-in-project",
    },
    getProjects(),
    inProject
  );
  const newprojectBtnEl = document.createElement("button");
  const projectSelectFieldsGroup = getFieldsetEl(
    "Add Task To A Project",
    projectSelectField,
    newprojectBtnEl
  );

  const btnsWrapperEl = document.createElement("div");
  const submitBtnEl = document.createElement("button");
  const cancelBtnEl = document.createElement("button");

  taskModalEl.classList.add("modal-new-task");
  formEl.classList.add("modal-new-task__form");
  formHeaderEl.classList.add("title", "title--secondary");
  formFieldContainerEl.classList.add("modal-new-task__fields-container");
  priorityFieldsGroup.classList.add("modal-new-task__priority");
  projectSelectFieldsGroup.classList.add("modal-new-task__project");
  btnsWrapperEl.classList.add("modal-new-task__btns-wrapper");
  newprojectBtnEl.classList.add("btn", "btn--submit");
  submitBtnEl.classList.add("btn", "btn--submit");
  cancelBtnEl.classList.add("btn", "btn--cancel");

  newprojectBtnEl.setAttribute("type", "button");
  submitBtnEl.setAttribute("type", "submit");
  cancelBtnEl.setAttribute("type", "button");

  if (title) {
    formHeaderEl.textContent = "Edit Task";
    submitBtnEl.textContent = "Done";
  } else {
    formHeaderEl.textContent = "Create New Task";
    submitBtnEl.textContent = "Create";
  }

  formHeaderEl.textContent = title ? "Edit Task" : "Create a New Task";
  newprojectBtnEl.textContent = "Create A New Project";
  submitBtnEl.textContent = title ? "Done" : "Create";
  cancelBtnEl.textContent = "Cancel";

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskTitle = titleField.querySelector("input").value;
    const taskDescription = descriptionField.querySelector("textarea").value;
    const taskDueDate = dueDateField.querySelector("input").value;
    const taskDueTime = dueTimeField.querySelector("input").value;
    const taskPriority =
      priorityFieldsGroup.querySelector("input:checked").value;
    const taskInProject = projectSelectField.querySelector("select").value;

    const task = createTodoObj(
      taskTitle,
      taskDescription,
      taskDueDate,
      taskDueTime,
      taskPriority,
      taskInProject,
      isCompleted
    );

    const isTaskEdited = checkTodoEdit(todoObj, task);

    if (!title) {
      // always add the newly created todo on top of the list
      addTodo(task);
    } else if (title && isTaskEdited) {
      // add edied todo on top of the list, only when user has successfully edited the todo
      deleteTodo(todoObj); // delete the original task object after editing
      addTodo(task);
    }

    dispatchUpdateTodosEvent();
    closeAndRemoveModal(taskModalEl);
  });

  cancelBtnEl.addEventListener("click", () => closeAndRemoveModal(taskModalEl));

  newprojectBtnEl.addEventListener("click", () => {
    const projectModalEl = NewProjectModal();
    taskModalEl.append(projectModalEl);
    projectModalEl.showModal();
  });

  // listen for a custom event to update the projects options list
  listenUpdateProjectsEvent(() => {
    const projectSelectDOMEl = projectSelectField.querySelector("select");

    // remove prev renders
    projectSelectDOMEl.innerHTML = "";

    // render updated option list
    getProjects().forEach((option, index) => {
      const optionEl = getOptionEl(option, { value: option });
      if (index === 0) optionEl.setAttribute("selected", ""); // the first option gets selected by default
      projectSelectDOMEl.append(optionEl);
    });
  });

  // dont close modal when pressing escape key
  taskModalEl.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      e.preventDefault();
    }
  });

  btnsWrapperEl.append(submitBtnEl, cancelBtnEl);
  formFieldContainerEl.append(
    titleField,
    descriptionField,
    dueDateAndTimeFieldsGroup,
    priorityFieldsGroup,
    projectSelectFieldsGroup
  );
  formEl.append(formHeaderEl, formFieldContainerEl, btnsWrapperEl);
  taskModalEl.append(formEl);

  return taskModalEl;
};

export default NewTaskModal;
