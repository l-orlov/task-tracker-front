import { put, takeEvery, call } from "redux-saga/effects";

import { types } from "./types";
import {
  UpdateProjectBoardProgressStatusTasksStart,
  UpdateProjectBoardProgressStatusTasksSuccess,
  UpdateProjectBoardProgressStatusTasksError,
  UpdateProjectBoardProgressStatusesStart,
  UpdateProjectBoardProgressStatusesSuccess,
  UpdateProjectBoardProgressStatusesError,
  getProjectBoardStart,
  getProjectBoardSuccess,
  getProjectBoardError,
  UpdateProjectBoardPartsStart,
  UpdateProjectBoardPartsSuccess,
  UpdateProjectBoardPartsError,
} from "./actions";
import { instance } from "../../utils/";

const { REACT_APP_BACKEND_URL } = process.env;

function* getProjectBoard(action) {
  const { id } = action.payload;
  yield put(getProjectBoardStart());
  try {
    const response = yield call(() =>
      instance.get(`${REACT_APP_BACKEND_URL}/api/v1/project-board/?projectId=${id}`),
    );
    yield put(getProjectBoardSuccess(response.data));
  } catch (error) {
    yield put(
      getProjectBoardError({
        response: error.response,
        error: error,
        data: error.response.data,
      }),
    );
  }
}

function* UpdateProjectBoardParts() {
  yield put(UpdateProjectBoardPartsStart());
  try {
    const response = yield call(() =>
      instance.get(`${REACT_APP_BACKEND_URL}/api/v1/projects/to-user`),
    );
    yield put(UpdateProjectBoardPartsSuccess(response.data));
  } catch (error) {
    yield put(
      UpdateProjectBoardPartsError({
        response: error.response,
        error: error,
        data: error.response.data,
      }),
    );
  }
}
function* UpdateProjectBoardProgressStatuses() {
  yield put(UpdateProjectBoardProgressStatusesStart());
  try {
    const response = yield call(() =>
      instance.get(`${REACT_APP_BACKEND_URL}/api/v1/projects/to-user`),
    );
    yield put(UpdateProjectBoardProgressStatusesSuccess(response.data));
  } catch (error) {
    yield put(
      UpdateProjectBoardProgressStatusesError({
        response: error.response,
        error: error,
        data: error.response.data,
      }),
    );
  }
}
function* UpdateProjectBoardProgressStatusTasks() {
  yield put(UpdateProjectBoardProgressStatusTasksStart());
  try {
    const response = yield call(() =>
      instance.get(`${REACT_APP_BACKEND_URL}/api/v1/projects/to-user`),
    );
    yield put(UpdateProjectBoardProgressStatusTasksSuccess(response.data));
  } catch (error) {
    yield put(
      UpdateProjectBoardProgressStatusTasksError({
        response: error.response,
        error: error,
        data: error.response.data,
      }),
    );
  }
}

export default function* watchProjectBoard() {
  yield takeEvery(types.getProjectBoard, getProjectBoard);
  yield takeEvery(types.UpdateProjectBoardParts, UpdateProjectBoardParts);
  yield takeEvery(types.UpdateProjectBoardProgressStatuses, UpdateProjectBoardProgressStatuses);
  yield takeEvery(
    types.UpdateProjectBoardProgressStatusTasks,
    UpdateProjectBoardProgressStatusTasks,
  );
}
