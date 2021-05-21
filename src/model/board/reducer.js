import { types } from "./types";

const inititalState = {
  projectBoard: [],
  status: false,
  error: { error: {}, response: "", data: {} },
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
      console.log(
        action.payload.map((el) => ({
          ...el,
          confirmed: true,
        })),
      );
      return {
        ...state,
        status: true,
        projectBoard: action.payload.map((el) => ({
          ...el,
          confirmed: true,
        })),
        error: { error: {}, response: "", data: {} },
      };
    case `${types.getProjectBoard}_ERROR`:
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
