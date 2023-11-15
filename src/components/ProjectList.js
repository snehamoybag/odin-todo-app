import {
  inBuiltProject,
  getProjects,
  listenUpdateProjectsEvent,
} from "../scripts/projects";
import {
  getTodosByProjectName,
  listenUpdateTodosEvent,
} from "../scripts/todos";
import { getDOMTodoListContainer } from "./TodoListContainer";
import { todoListInProject } from "./TodosList";

const ProjectList = () => {
  const createProjectListItemEl = (projectName) => {
    const listItemEl = document.createElement("li");
    const linkEl = document.createElement("a");
    const numOfTodosInProjectEl = document.createElement("span");
    const numOfTodosInProject = getTodosByProjectName(projectName).length;

    listItemEl.classList.add("projects-list__item");
    numOfTodosInProjectEl.classList.add("bubble-number");

    linkEl.href = "#";
    linkEl.textContent = projectName;
    numOfTodosInProjectEl.title = "Number of Tasks in this Project";
    numOfTodosInProjectEl.textContent = numOfTodosInProject;

    listItemEl.append(linkEl);
    if (numOfTodosInProject > 0) listItemEl.append(numOfTodosInProjectEl);

    listItemEl.addEventListener("click", (e) => {
      const todoListDOMContainer = getDOMTodoListContainer();

      e.preventDefault();
      todoListDOMContainer.innerHTML = ""; // remove prev redered todo list
      todoListDOMContainer.append(todoListInProject(projectName));
    });

    return listItemEl;
  };

  const listEl = document.createElement("ul");

  listEl.classList.add("projects-list");

  const renderProjectListIems = () => {
    listEl.textContent = "Projects"; // making sure it doesn't get removed when using `innerHTMl = ""` while re-rendering

    getProjects().forEach((project) => {
      if (project !== inBuiltProject) {
        listEl.append(createProjectListItemEl(project));
      }
    });
  };

  const reRenderProjectListItems = () => {
    listEl.innerHTML = ""; // remove previous renders
    renderProjectListIems();
  };

  // render when this component is called
  renderProjectListIems();

  // re-render all item elements when either todos or projects data gets updated
  listenUpdateTodosEvent(reRenderProjectListItems);
  listenUpdateProjectsEvent(reRenderProjectListItems);

  return listEl;
};

export default ProjectList;
