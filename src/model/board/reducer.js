import { types } from "./types";
import produce from "immer";

const inititalState = {
  projectBoard: [],
  status: false,
  error: { error: {}, response: "", data: {} },
};

const updateProjectBoard = (payload) => {
  const data = [...payload];
  for (let i = 0; i < data.length; i++) {
    data[i].progressStatusId = `statuses-${data[i].progressStatusId}`;
    data[i].confirmed = true;
    for (let t = 0; t < data[i].tasks.length; t++) {
      data[i].tasks[t].taskId = `task-${data[i].tasks[t].taskId}`;
    }
  }
  return data;
};

export default function reducer(state = inititalState, action) {
  switch (action.type) {
    case `${types.getProjectBoard}_START`:
      return {
        ...state,
        status: false,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.getProjectBoard}_SUCCESS`:
      return {
        ...state,
        status: true,
        projectBoard: updateProjectBoard(action.payload),
        error: { error: {}, response: "", data: {} },
      };
    case `${types.getProjectBoard}_ERROR`:
      return {
        ...state,
        status: false,
        error: action.payload,
      };

    case `${types.createTask}_START`:
      return {
        ...state,
        status: false,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.createTask}_SUCCESS`:
      const updatedProject = produce(state.projectBoard, (draftProj) => {
        const tasks = draftProj.find(
          (el) => el.progressStatusId === `statuses-${action.payload.progressStatusId}`,
        ).tasks;

        tasks.push({
          taskId: `task-${action.payload.taskId}`,
          taskTitle: action.payload.title,
          assigneeId: action.payload.assigneeId,
          taskOrderNum: tasks.length,
          assigneeLastname: "orlov",
          assigneeAvatarURL: "",
          assigneeFirstname: "lev",
        });
      });

      return {
        ...state,
        status: true,
        projectBoard: updatedProject,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.createTask}_ERROR`:
      return {
        ...state,
        status: false,
        error: action.payload,
      };
    case `${types.createStatuses}_START`:
      return {
        ...state,
        status: false,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.createStatuses}_SUCCESS`:
      const obj = {
        tasks: [],
        progressStatusId: `statuses-${action.payload.progressStatusId}`,
        progressStatusName: action.payload.name,
        progressStatusOrderNum: action.payload.orderNum,
        confirmed: true,
      };

      return {
        ...state,
        status: true,
        projectBoard: [...state.projectBoard, obj],
        error: { error: {}, response: "", data: {} },
      };
    case `${types.createStatuses}_ERROR`:
      return {
        ...state,
        status: false,
        error: action.payload,
      };
    case `${types.UpdateProjectBoardParts}_START`:
      return {
        ...state,
        status: false,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.UpdateProjectBoardParts}_SUCCESS`:
      return {
        ...state,
        status: true,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.UpdateProjectBoardParts}_ERROR`:
      return {
        ...state,
        status: false,
        error: action.payload,
      };
    case `${types.UpdateProjectBoardProgressStatuses}_START`:
      return {
        ...state,
        status: false,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.UpdateProjectBoardProgressStatuses}_SUCCESS`:
      return {
        ...state,
        status: true,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.UpdateProjectBoardProgressStatuses}_ERROR`:
      return {
        ...state,
        status: false,
        error: action.payload,
      };
    case `${types.UpdateProjectBoardProgressStatusTasks}_START`:
      return {
        ...state,
        status: false,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.UpdateProjectBoardProgressStatusTasks}_SUCCESS`:
      return {
        ...state,
        status: true,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.UpdateProjectBoardProgressStatusTasks}_ERROR`:
      return {
        ...state,
        status: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
