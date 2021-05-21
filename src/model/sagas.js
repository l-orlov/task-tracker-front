import { all } from "redux-saga/effects";

import watchUser from "./user/saga";
import watchProjects from "./projects/saga";
import watchProjectBoard from "./board/saga";

export function* rootSaga() {
  yield all([watchUser(), watchProjects(), watchProjectBoard()]);
}
