import { getFormatedDueDateAndTime } from "../scripts/dates";
import { getTodoStatus } from "../scripts/todos";

const TodoDueDate = (todoObj) => {
  const todoDueEl = document.createElement("p");

  let dueElText = "";
  let dueElClass = "text-normal";
  switch (getTodoStatus(todoObj)) {
    case "completed":
      dueElText = "Completed!";
      dueElClass = "text-success";
      break;
    case "expired":
      dueElText = `Expired on ${getFormatedDueDateAndTime(
        todoObj.dueDateTimeStamp
      )}`;
      dueElClass = "text-danger";
      break;
    default:
      dueElText = `Due on ${getFormatedDueDateAndTime(
        todoObj.dueDateTimeStamp
      )}`;
      dueElClass = "text-normal";
      break;
  }

  todoDueEl.classList.add(dueElClass);
  todoDueEl.textContent = dueElText;

  return todoDueEl;
};

export default TodoDueDate;
