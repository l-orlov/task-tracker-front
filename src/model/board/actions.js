import { types } from "./types";

export const getProjectBoard = (data) => ({
  type: `${types.getProjectBoard}`,
  payload: data,
});
export const getProjectBoardStart = () => ({
  type: `${types.getProjectBoard}_START`,
});
export const getProjectBoardSuccess = (data) => ({
  type: `${types.getProjectBoard}_SUCCESS`,
  payload: data,
});
export const getProjectBoardError = () => ({
  type: `${types.getProjectBoard}_ERROR`,
});

export const createStatuses = (data) => ({
  type: `${types.createStatuses}`,
  payload: data,
});

export const createStatusesStart = () => ({
  type: `${types.createStatuses}_START`,
});
export const createStatusesSuccess = (data) => ({
  type: `${types.createStatuses}_SUCCESS`,
  payload: data,
});
export const createStatusesError = () => ({
  type: `${types.createStatuses}_ERROR`,
});

export const createTask = (data) => ({
  type: `${types.createTask}`,
  payload: data,
});

export const createTaskStart = () => ({
  type: `${types.createTask}_START`,
});
export const createTaskSuccess = (data) => ({
  type: `${types.createTask}_SUCCESS`,
  payload: data,
});
export const createTaskError = () => ({
  type: `${types.createTask}_ERROR`,
});

////////////////////////////////////////////////////UPDATE/////////////////////////////////////////////////////////////////////////////

export const UpdateProjectBoardParts = (data) => ({
  type: `${types.UpdateProjectBoardParts}`,
  payload: data,
});

export const UpdateProjectBoardPartsStart = () => ({
  type: `${types.UpdateProjectBoardParts}_START`,
});
export const UpdateProjectBoardPartsSuccess = (data) => ({
  type: `${types.UpdateProjectBoardParts}_SUCCESS`,
  payload: data,
});
export const UpdateProjectBoardPartsError = (data) => ({
  type: `${types.UpdateProjectBoardParts}_ERROR`,
  payload: data,
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UpdateProjectBoardProgressStatuses = (data) => ({
  type: `${types.UpdateProjectBoardProgressStatuses}`,
  payload: data,
});

export const UpdateProjectBoardProgressStatusesStart = () => ({
  type: `${types.UpdateProjectBoardProgressStatuses}_START`,
});
export const UpdateProjectBoardProgressStatusesSuccess = (data) => ({
  type: `${types.UpdateProjectBoardProgressStatuses}_SUCCESS`,
  payload: data,
});
export const UpdateProjectBoardProgressStatusesError = (data) => ({
  type: `${types.UpdateProjectBoardProgressStatuses}_ERROR`,
  payload: data,
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UpdateProjectBoardProgressStatusTasks = (data) => ({
  type: `${types.UpdateProjectBoardProgressStatusTasks}`,
  payload: data,
});

export const UpdateProjectBoardProgressStatusTasksStart = () => ({
  type: `${types.UpdateProjectBoardProgressStatusTasks}_START`,
});
export const UpdateProjectBoardProgressStatusTasksSuccess = (data) => ({
  type: `${types.UpdateProjectBoardProgressStatusTasks}_SUCCESS`,
  payload: data,
});
export const UpdateProjectBoardProgressStatusTasksError = (data) => ({
  type: `${types.UpdateProjectBoardProgressStatusTasks}_ERROR`,
  payload: data,
});
