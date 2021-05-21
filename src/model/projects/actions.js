import { types } from "./types";

export const createProject = (data) => ({
  type: `${types.createProject}`,
  payload: data,
});
export const createProjectStart = () => ({
  type: `${types.createProject}_START`,
});
export const createProjectSuccess = () => ({
  type: `${types.createProject}_SUCCESS`,
});
export const createProjectError = () => ({
  type: `${types.createProject}_ERROR`,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getProjects = (data) => ({
  type: `${types.getProjects}`,
  payload: data,
});

export const getProjectsStart = () => ({
  type: `${types.getProjects}_START`,
});
export const getProjectsSuccess = (data) => ({
  type: `${types.getProjects}_SUCCESS`,
  payload: data,
});
export const getProjectsError = (data) => ({
  type: `${types.getProjects}_ERROR`,
  payload: data,
});
