import { storeAndSyncData } from "./utilities";

const projectsKey = "projects";
let projects = [];

export const getProjects = () => projects;

const setProjects = () => {
  projects = storeAndSyncData(projects, projectsKey);
};

export const addAProject = (projectName) => {
  projects.unshift(projectName); // add it at the beginning
  setProjects();
};

// only works on simple componentes
export const renderProjects = (componentFunc, outputEl) => {
  projects.forEach((project) => {
    outputEl.append(componentFunc(project));
  });
};

const updateProjectsEventListenerEl = document.body;
const updateProjectsEventName = "update-projects";

export const dispatchUpdateProjectsEvent = () => {
  const customEvent = new Event(updateProjectsEventName);
  updateProjectsEventListenerEl.dispatchEvent(customEvent);
};

export const listenUpdateProjectsEvent = (doStuffFunc) => {
  updateProjectsEventListenerEl.addEventListener(
    updateProjectsEventName,
    doStuffFunc
  );
};
