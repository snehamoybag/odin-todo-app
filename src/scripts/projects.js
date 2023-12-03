import { storeAndSyncData } from "./utilities";

const projectsKey = "projects";
export const inBuiltProject = "none"; // any task that is not inside a project goes here by default
let projects = [
  inBuiltProject,
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

export const getProjects = () => projects;

const storeAndSyncProjects = () => {
  projects = storeAndSyncData(projects, projectsKey);
};

export const addProject = (projectName) => {
  projects.unshift(projectName); // add it at the beginning
  storeAndSyncProjects();
};

export const editProject = (prevName, newName) => {
  const indexOfProject = projects.indexOf(prevName);

  if (indexOfProject >= 0) {
    projects.splice(indexOfProject, 1, newName);
    storeAndSyncProjects();
  }
};

export const deleteProject = (projectName) => {
  const indexOfDeleteProject = projects.indexOf(projectName);

  if (indexOfDeleteProject >= 0) {
    projects.splice(indexOfDeleteProject, 1);
    storeAndSyncProjects();
  }
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
