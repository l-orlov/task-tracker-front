import { all } from "redux-saga/effects";

import watchAuthorization from "./authorization/saga";
import watchRegistration from "./registration/saga";
export function* rootSaga() {
  yield all([watchRegistration(), watchAuthorization()]);
}
