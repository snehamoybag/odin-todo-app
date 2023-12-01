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

const setProjects = () => {
  projects = storeAndSyncData(projects, projectsKey);
};

export const addAProject = (projectName) => {
  projects.unshift(projectName); // add it at the beginning
  setProjects();
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
