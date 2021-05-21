import { put, takeEvery, call } from "redux-saga/effects";

import { types } from "./types";
import {
  createProjectStart,
  createProjectSuccess,
  createProjectError,
  getProjectsStart,
  getProjectsSuccess,
  getProjectsError,
} from "./actions";
import { instance } from "../../utils/";

const { REACT_APP_BACKEND_URL } = process.env;

function* createProject(action) {
  const { name, description } = action.payload;
  yield put(createProjectStart());
  try {
    const response = yield call(() =>
      instance.post(`${REACT_APP_BACKEND_URL}/api/v1/projects/`, {
        name,
        description,
      }),
    );
    yield put(createProjectSuccess(response.data));
  } catch (error) {
    yield put(
      createProjectError({
        response: error.response,
        error: error,
        data: error.response.data,
      }),
    );
  }
}

function* getProjects() {
  yield put(getProjectsStart());
  try {
    const response = yield call(() =>
      instance.get(`${REACT_APP_BACKEND_URL}/api/v1/projects/to-user`),
    );
    yield put(getProjectsSuccess(response.data));
  } catch (error) {
    yield put(
      getProjectsError({
        response: error.response,
        error: error,
        data: error.response.data,
      }),
    );
  }
}

export default function* watchProjects() {
  yield takeEvery(types.createProject, createProject);
  yield takeEvery(types.getProjects, getProjects);
}
