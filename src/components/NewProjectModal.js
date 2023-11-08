import { inputField } from "../scripts/formFieldGenerator";
import { addAProject, dispatchUpdateProjectsEvent } from "../scripts/projects";

const NewProjectModal = (inProject = "") => {
  const modalEl = document.createElement("dialog");
  const titleEl = document.createElement("h2");
  const formEl = document.createElement("form");
  const projectField = inputField("Project Name", {
    type: "text",
    id: "new-project",
    name: "new-project",
    value: inProject || "",
    required: "",
  });
  const btnsWrapperEl = document.createElement("div");
  const submitBtnEl = document.createElement("button");
  const cancelBtnEl = document.createElement("button");

  const closeAndRemoveModal = () => {
    modalEl.close();
    modalEl.remove();
  };

  modalEl.classList.add("new-project-modal");
  titleEl.classList.add("title", "title--secondary");
  btnsWrapperEl.classList.add("new-project-modal__btn-wrapper");
  submitBtnEl.classList.add("btn", "btn--submit");
  cancelBtnEl.classList.add("btn", "btn--cancel");

  submitBtnEl.setAttribute("type", "submit");
  cancelBtnEl.setAttribute("type", "button");

  titleEl.textContent = inProject ? "Edit Project" : "Create New Project";
  submitBtnEl.textContent = inProject ? "Done" : "Create";
  cancelBtnEl.textContent = "Cancel";

  formEl.addEventListener("submit", () => {
    addAProject(projectField.querySelector("#new-project").value);
    dispatchUpdateProjectsEvent();
    closeAndRemoveModal();
  });

  cancelBtnEl.addEventListener("click", closeAndRemoveModal);

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
