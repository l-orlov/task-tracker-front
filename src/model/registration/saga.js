import { put, takeEvery, call } from "redux-saga/effects";

import { types } from "./types";
import { registrationStart, registrationSuccess, registrationError } from "./actions";
import { instance } from "../../utils/";

const { REACT_APP_BACKEND_URL } = process.env;

function* registration(action) {
  const { email, firstName, lastName, password } = action.payload;
  console.log(action.payload);
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

export default function* watchRegistration() {
  yield takeEvery(types.registration, registration);
}
