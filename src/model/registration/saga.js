import { put, takeEvery, call } from "redux-saga/effects";

export { types } from "./types";
export { registrationStart, registrationSuccess, registrationError } from "./actions";
import { instance } from "../../utils/";

const { REACT_APP_BACKEND_URL } = process.env;

function* registration(action) {
  yield put(registrationStart());
  try {
    const response = yield call(() => instance.get(`${REACT_APP_BACKEND_URL}/auth/sign-in`));
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
