import { types } from "./types";

const inititalState = {
  status: false,
  error: { error: {}, response: "", data: {} },
};

export default function reducer(state = inititalState, action) {
  switch (action.type) {
    case `${types.authorization}_START`:
      return {
        ...state,
        status: false,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.authorization}_SUCCESS`:
      return {
        ...state,
        status: true,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.authorization}_ERROR`:
      return {
        ...state,
        status: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
