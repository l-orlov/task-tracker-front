import { combineReducers } from "redux";

import user from "./user/reducer";
import projects from "./projects/reducer";
import board from "./board/reducer";

const appReducer = combineReducers({
  user,
  projects,
  board,
});

export default function rootReducer(state, action) {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
}
