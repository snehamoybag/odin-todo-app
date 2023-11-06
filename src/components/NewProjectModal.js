import { inputField } from "../scripts/formFieldGenerator";
import { addAProject } from "../scripts/projects";

const NewProjectModal = (inProject = "") => {
  const modalEl = document.createElement("dialog");
  const titleEl = document.createElement("h2");
  const projectField = inputField("Project Name", {
    type: "text",
    id: "new-project",
    name: "new-project",
    value: inProject || "",
    required: true,
  });
  const btnsWrapperEl = document.createElement("div");
  const submitBtnEl = document.createElement("button");
  const cancelBtnEl = document.createElement("button");

  const closeAndRemoveModal = () => {
    modalEl.close();
    modalEl.remove();
  };

  modalEl.classList.add("new-prohject-modal");
  titleEl.classList.add("title", "title--secondary");
  btnsWrapperEl.classList.add("new-project-modal__btn-wrapper");
  submitBtnEl.classList.add("btn", "btn--submit"),
    cancelBtnEl.classList.add("btn", "btn--cancel");

  titleEl.textContent = inProject ? "Edit Project" : "Create New Project";
  submitBtnEl.textContent = inProject ? "Done" : "Create";
  cancelBtnEl.textContent = "Cancel";

  submitBtnEl.addEventListener("click", () => {
    addAProject(projectField.querySelector("#new-project").value);
    closeAndRemoveModal();
  });

  cancelBtnEl.addEventListener("click", closeAndRemoveModal);

  modalEl.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalEl.hasAttribute("open")) {
      closeAndRemoveModal();
    }
  });

  btnsWrapperEl.append(submitBtnEl, cancelBtnEl);
  modalEl.append(titleEl, projectField, btnsWrapperEl);

  return modalEl;
};

export default NewProjectModal;
