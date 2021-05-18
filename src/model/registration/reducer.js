import { types } from "./types";

const initialState = {
  status: false,
  error: { error: {}, response: "", data: {} },
};

export default function reducer(state = inititalState, action) {
  switch (key) {
    case `${types.registration}_START`:
      return {
        ...state,
        status: false,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.registration}_SUCCESS`:
      return {
        ...state,
        status: true,
        error: { error: {}, response: "", data: {} },
      };
    case `${types.registration}_ERROR`:
      return {
        ...state,
        status: false,
        error: action.payload,
      };
    default:
      return state;
  }
}