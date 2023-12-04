import emoji from "../assets/thinking-face.svg";
import NewTaskModal from "./NewTaskModal";

const EmptyTodo = () => {
  const containerEl = document.createElement("li");
  const emojiEl = new Image();
  const titleEl = document.createElement("h2");
  const descEl = document.createElement("p");
  const newTaskBtnEl = document.createElement("button");

  containerEl.classList.add("empty-todo");
  emojiEl.classList.add("empty-todo__emoji");
  titleEl.classList.add("empty-todo__title");
  descEl.classList.add("empty-todo__description");
  newTaskBtnEl.classList.add("btn", "btn--edit");

  emojiEl.src = emoji;
  emojiEl.ariaLabel = "thinking emoji";

  titleEl.textContent = "Hmm...";
  descEl.textContent = "There is no task here, would you like to add one?";
  newTaskBtnEl.textContent = "Add New Task";

  newTaskBtnEl.addEventListener("click", () => {
    const mainEl = document.querySelector("main");
    const newTaskModalEl = NewTaskModal();

    mainEl.append(newTaskModalEl);

    newTaskModalEl.showModal();
  });

  containerEl.append(emojiEl, titleEl, descEl, newTaskBtnEl);

  return containerEl;
};

export default EmptyTodo;
