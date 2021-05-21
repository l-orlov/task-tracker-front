import { put, takeEvery, call } from "redux-saga/effects";

import { types } from "./types";
import {
  registrationStart,
  registrationSuccess,
  registrationError,
  authorizationStart,
  authorizationSuccess,
  authorizationError,
} from "./actions";
import { instance } from "../../utils/";

const { REACT_APP_BACKEND_URL } = process.env;

function* registration(action) {
  const { email, firstName, lastName, password } = action.payload;
  yield put(registrationStart());
  try {
    const response = yield call(() =>
      instance.post(`${REACT_APP_BACKEND_URL}/auth/sign-up`, {
        email,
        firstName,
        lastName,
        password,
      }),
    );
    yield put(registrationSuccess(response.data));
  } catch (error) {
    yield put(
      registrationError({
        response: error.response,
        error: error,
        data: error.response.data,
      }),
    );
  }
}

function* authorization(action) {
  const { email, password, fingerprint } = action.payload;
  yield put(authorizationStart());
  try {
    const response = yield call(() =>
      instance.post(`${REACT_APP_BACKEND_URL}/auth/sign-in`, {
        email,
        password,
        fingerprint,
      }),
    );
    yield put(authorizationSuccess(response.data));
  } catch (error) {
    yield put(
      authorizationError({
        response: error.response,
        error: error,
        data: error.response.data,
      }),
    );
  }
}

export default function* watchUser() {
  yield takeEvery(types.registration, registration);
  yield takeEvery(types.authorization, authorization);
}
