import { setElementProps } from "../scripts/utilities";
import {
  inBuiltProject,
  getProjects,
  listenUpdateProjectsEvent,
  deleteProject,
  dispatchUpdateProjectsEvent,
} from "../scripts/projects";
import {
  createTodoObj,
  getTodosByProjectName,
  listenUpdateTodosEvent,
} from "../scripts/todos";
import SrOnly from "./SrOnly";
import { getDOMTodoListContainer } from "./TodoListContainer";
import { todoListInProject } from "./TodosList";
import NewTaskModal from "./NewTaskModal";
import NewProjectModal from "./NewProjectModal";

const ProjectList = (activateTabStyle) => {
  const appendAndShowModal = (modalEl) => {
    const mainEl = document.querySelector("main");
    mainEl.append(modalEl);
    modalEl.showModal();
  };

  const createProjectListItemEl = (projectName) => {
    const listItemEl = document.createElement("li");
    const textWrapperEl = document.createElement("div");
    const linkEl = document.createElement("a");
    const numOfTodosInProjectEl = document.createElement("span");
    const numOfTodosInProject = getTodosByProjectName(projectName).length;
    const btnsWrapperEl = document.createElement("div");
    const addBtnEl = document.createElement("button");
    const editBtnEl = document.createElement("button");
    const deleteBtnEl = document.createElement("button");

    listItemEl.classList.add("projects-list__item");
    numOfTodosInProjectEl.classList.add("num-bubble");
    textWrapperEl.classList.add("projects-list__item-texts-wrapper");
    btnsWrapperEl.classList.add("projects-list__item-btns-wrapper");

    setElementProps(addBtnEl, {
      title: "add a new task to this project",
      class: ["btn", "btn--icon_add"],
    });
    setElementProps(editBtnEl, {
      title: "edit project",
      class: ["btn", "btn--icon_edit"],
    });
    setElementProps(deleteBtnEl, {
      title: "delete project",
      class: ["btn", "btn--icon_delete"],
    });
    linkEl.href = "#";
    linkEl.textContent = projectName;
    numOfTodosInProjectEl.title = "Number of Tasks in this Project";
    numOfTodosInProjectEl.textContent = numOfTodosInProject;

    listItemEl.addEventListener("click", (e) => {
      const todoListDOMContainer = getDOMTodoListContainer();

      e.preventDefault();
      activateTabStyle(listItemEl);
      todoListDOMContainer.innerHTML = ""; // remove prev redered todo list
      todoListDOMContainer.append(todoListInProject(projectName)); // render updated todo list
    });

    textWrapperEl.append(linkEl);
    if (numOfTodosInProject > 0) textWrapperEl.append(numOfTodosInProjectEl);

    addBtnEl.addEventListener("click", (event) => {
      event.stopPropagation(); // since it is inside a parent that has it's own click event

      const todoObj = createTodoObj(
        "", // title
        "", // description
        "", // dueDate
        "", // duetime
        "", // priority
        projectName, // inProject
        false // isCompleted
      );
      const taskModalEl = NewTaskModal(todoObj);
      appendAndShowModal(taskModalEl);
    });

    editBtnEl.addEventListener("click", (event) => {
      event.stopPropagation(); // since it is inside a parent that has it's own click event

      const projectModalEl = NewProjectModal(projectName);
      appendAndShowModal(projectModalEl);
    });

    deleteBtnEl.addEventListener("click", (event) => {
      event.stopPropagation(); // since it is inside a parent that has it's own click event

      deleteProject(projectName);
      dispatchUpdateProjectsEvent();
    });

    addBtnEl.append(SrOnly("add to project"));
    editBtnEl.append(SrOnly("edit project"));
    deleteBtnEl.append(SrOnly("delete project"));
    btnsWrapperEl.append(addBtnEl, editBtnEl, deleteBtnEl);

    listItemEl.append(textWrapperEl, btnsWrapperEl);

    return listItemEl;
  };

  const listWrapperEl = document.createElement("figure");
  const listTitleWrapperEl = document.createElement("figcaption");
  const listTitleEl = document.createElement("h2");
  const addNewProjectBtnEl = document.createElement("button");
  const listEl = document.createElement("ul");

  listEl.classList.add("projects-list");
  listWrapperEl.classList.add("projects-list__wrapper");
  listTitleWrapperEl.classList.add("projects-list__title-wrapper");
  listTitleEl.classList.add("projects-list__title");

  setElementProps(addNewProjectBtnEl, {
    title: "add new project",
    class: "projects-list__add-btn",
  });

  listTitleEl.textContent = "Projects";

  const renderProjectListIems = () => {
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

  addNewProjectBtnEl.addEventListener("click", () => {
    appendAndShowModal(NewProjectModal());
  });

  addNewProjectBtnEl.append();
  listTitleWrapperEl.append(listTitleEl, addNewProjectBtnEl);
  listWrapperEl.append(listTitleWrapperEl, listEl);

  return listWrapperEl;
};

export default ProjectList;
