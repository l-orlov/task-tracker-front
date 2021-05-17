import { put, takeEvery, call } from "redux-saga/effects";

import { types } from "./types";
import { authorizationStart, authorizationSuccess, authorizationError } from "./actions";
import { instance } from "../../utils/";

const { REACT_APP_BACKEND_URL } = process.env;

function* authorization(action) {
  console.log(action);
  yield put(authorizationStart());
  try {
    const response = yield call(() =>
      instance.post(`${REACT_APP_BACKEND_URL}/auth/sign-in`, {
        email: action.payload.email,
        password: action.payload.password,
        fingerprint: "some_fingerprint",
      }),
    );
    yield put(authorizationSuccess(response.data));
  } catch (error) {
    console.log(error);
    // yield put(

    //   authorizationError({
    //     response: error.response,
    //     error: error,
    //     data: error.response.data,
    //   }),
    // );
  }
}

export default function* watchRegistration() {
  yield takeEvery(types.authorization, authorization);
}
