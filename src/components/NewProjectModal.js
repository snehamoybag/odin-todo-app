import { inputField } from "./FormFields";
import {
  addProject,
  editProject,
  dispatchUpdateProjectsEvent,
  getProjects,
} from "../scripts/projects";
import { closeAndRemoveModal } from "../scripts/utilities";

const NewProjectModal = (inProject = "") => {
  const modalEl = document.createElement("dialog");
  const titleEl = document.createElement("h2");
  const formEl = document.createElement("form");
  const projectInputId = "new-project";
  const projectField = inputField("Project Name", {
    type: "text",
    id: projectInputId,
    name: "new-project",
    value: inProject || "",
    maxLength: 30,
    required: "",
  });

  const btnsWrapperEl = document.createElement("div");
  const submitBtnEl = document.createElement("button");
  const cancelBtnEl = document.createElement("button");

  modalEl.classList.add("modal-new-project");
  formEl.classList.add("modal-new-project__form");
  titleEl.classList.add("title", "title--secondary");
  btnsWrapperEl.classList.add("modal-new-project__btns-wrapper");
  submitBtnEl.classList.add("btn", "btn--submit");
  cancelBtnEl.classList.add("btn", "btn--cancel");

  submitBtnEl.setAttribute("type", "submit");
  cancelBtnEl.setAttribute("type", "button");

  titleEl.textContent = inProject ? "Edit Project" : "Create New Project";
  submitBtnEl.textContent = inProject ? "Done" : "Create";
  cancelBtnEl.textContent = "Cancel";

  const projectInputDOMEl = projectField.querySelector(`#${projectInputId}`);

  // dont allow duplicate project names
  projectInputDOMEl.addEventListener("change", () => {
    const userInput = projectInputDOMEl.value;
    const isUserInputDuplicate = getProjects().includes(userInput);

    if (isUserInputDuplicate) {
      projectInputDOMEl.setCustomValidity(
        "Error: project either already exists or is invalid. Try a different name."
      );
    } else {
      projectInputDOMEl.setCustomValidity("");
    }
  });

  // only submited when input field is valid
  formEl.addEventListener("submit", (e) => {
    const userInput = projectInputDOMEl.value;
    e.preventDefault(); // to turn off 'form not connected warning'

    if (inProject) {
      editProject(inProject, userInput);
    } else {
      addProject(userInput);
    }

    dispatchUpdateProjectsEvent();
    closeAndRemoveModal(modalEl);
  });

  cancelBtnEl.addEventListener("click", () => closeAndRemoveModal(modalEl));

  modalEl.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      e.preventDefault();
    }
  });

  btnsWrapperEl.append(submitBtnEl, cancelBtnEl);
  formEl.append(titleEl, projectField, btnsWrapperEl);
  modalEl.append(formEl);

  return modalEl;
};

export default NewProjectModal;
