import { types } from "./types";

const inititalState = {
  projects: [],
  status: false,
  isCreated: false,
  error: { error: {}, response: "", data: {} },
};

export default function reducer(state = inititalState, action) {
  switch (action.type) {
    case `${types.createProject}_START`:
      return {
        ...state,
        status: false,
        isCreated: false,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.createProject}_SUCCESS`:
      return {
        ...state,
        status: true,
        isCreated: true,
        error: { error: {}, response: "", data: {} },
        projects: [...state.projects, action.payload],
      };
    case `${types.createProject}_ERROR`:
      return {
        ...state,
        status: false,
        isCreated: false,
        error: action.payload,
      };
    case `${types.getProjects}_START`:
      return {
        ...state,
        status: false,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.getProjects}_SUCCESS`:
      return {
        ...state,
        projects: action.payload,
        status: true,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.getProjects}_ERROR`:
      return {
        ...state,
        status: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
