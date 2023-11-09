import { storeAndSyncData } from "./utilities";

const _projectsKey = "projects";
let _projects = [];

export const getProjects = () => _projects;

const _setProjects = () => {
  _projects = storeAndSyncData(_projects, _projectsKey);
};

export const addAProject = (projectName) => {
  _projects.unshift(projectName); // add it at the beginning
  _setProjects();
};

// only works on simple componentes
export const renderProjects = (componentFunc, outputEl) => {
  _projects.forEach((project) => {
    outputEl.append(componentFunc(project));
  });
};

const _updateProjectsEventListenerEl = document.body;
const _updateProjectsEventName = "update-projects";

export const dispatchUpdateProjectsEvent = () => {
  const customEvent = new Event(_updateProjectsEventName);
  _updateProjectsEventListenerEl.dispatchEvent(customEvent);
};

export const listenUpdateProjectsEvent = (doStuffFunc) => {
  _updateProjectsEventListenerEl.addEventListener(
    _updateProjectsEventName,
    doStuffFunc
  );
};
