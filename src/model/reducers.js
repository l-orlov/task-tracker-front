import { combineReducers } from "redux";

import authorization from "./authorization/reducer";

const appReducer = combineReducers({
  authorization,
});

export default function rootReducer(state, action) {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
}
