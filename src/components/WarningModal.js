import { closeAndRemoveModal } from "../scripts/utilities";

const WarningModal = (warningProps, doStuffFunc) => {
  const modalEl = document.createElement("dialog");
  const titleEl = document.createElement("h2");
  const textEl = document.createElement("p");
  const btnsWrapperEl = document.createElement("div");
  const dangerBtnEl = document.createElement("button");
  const cancelBtnEl = document.createElement("button");

  modalEl.classList.add("modal-warning");
  titleEl.classList.add("title", "tittle--secondary");
  textEl.classList.add("modal-warning__description", "text-warning");
  btnsWrapperEl.classList.add("modal-warning__btns-wrapper");
  dangerBtnEl.classList.add("btn", "btn--danger");
  cancelBtnEl.classList.add("btn", "btn--cancel");

  titleEl.textContent = warningProps.title;
  textEl.textContent = warningProps.description;
  dangerBtnEl.textContent = warningProps.deleteBtnText;
  cancelBtnEl.textContent = warningProps.cancelBtnText;

  dangerBtnEl.addEventListener("click", () => {
    doStuffFunc();
    closeAndRemoveModal(modalEl);
  });
  cancelBtnEl.addEventListener("click", () => closeAndRemoveModal(modalEl));

  btnsWrapperEl.append(dangerBtnEl, cancelBtnEl);
  modalEl.append(titleEl, textEl, btnsWrapperEl);

  return modalEl;
};

export default WarningModal;
