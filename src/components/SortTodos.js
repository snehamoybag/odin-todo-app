import { setActiveSortingOption } from "../scripts/todos";
import { dispatchUpdateTodosEvent } from "../scripts/todos";

const SortTodos = () => {
  const wrapperEl = document.createElement("p");
  const sortElLabelEl = document.createElement("label");
  const sortEl = document.createElement("select");
  const sortElId = "sort-todos";
  const optSortByDueDateEl = document.createElement("option");
  const optSortByPriorityHighToLowEl = document.createElement("option");
  const optSortByPriorityLowToHighEl = document.createElement("option");
  const optSortByOldToNewEl = document.createElement("option");
  const optSortByNewToOldEl = document.createElement("option");
  const optPlaceholderEl = document.createElement("option");

  sortElLabelEl.for = sortElId;
  sortEl.id = sortElId;
  sortEl.name = sortElId;
  optPlaceholderEl.disabled = true;
  optSortByNewToOldEl.selected = true; // by default newest to oldest is selected

  sortElLabelEl.textContent = "Sort by: ";
  optPlaceholderEl.textContent = "--Select one--";
  optSortByDueDateEl.textContent = "Due Date";
  optSortByPriorityHighToLowEl.textContent = "Priority: High to Low";
  optSortByPriorityLowToHighEl.textContent = "Priority: Low to High";
  optSortByNewToOldEl.textContent = "Newest to Oldest";
  optSortByOldToNewEl.textContent = "Oldest to Newest";

  sortEl.addEventListener("change", () => {
    setActiveSortingOption(sortEl.value);
    dispatchUpdateTodosEvent();
  });

  wrapperEl.append(sortElLabelEl, sortEl);
  sortEl.append(
    optPlaceholderEl,
    optSortByDueDateEl,
    optSortByPriorityHighToLowEl,
    optSortByPriorityLowToHighEl,
    optSortByOldToNewEl,
    optSortByNewToOldEl
  );

  return wrapperEl;
};

export default SortTodos;
