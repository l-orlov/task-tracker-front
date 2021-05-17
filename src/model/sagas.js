import { all } from "redux-saga/effects";

import watchRegistration from "./authorization/saga";

export function* rootSaga() {
  yield all([watchRegistration()]);
}
