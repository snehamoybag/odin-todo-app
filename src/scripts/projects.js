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
