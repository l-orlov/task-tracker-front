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
  createStatusesStart,
  createStatusesSuccess,
  createStatusesError,
  createTaskStart,
  createTaskSuccess,
  createTaskError,
  updateTaskStart,
  updateTaskSuccess,
  updateTaskError,
  deleteTaskStart,
  deleteTaskSuccess,
  deleteTaskError,
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

function* createStatuses(action) {
  const { projectId, name, orderNum } = action.payload;
  yield put(createStatusesStart());
  try {
    const response = yield call(() =>
      instance.post(`${REACT_APP_BACKEND_URL}/api/v1/project-progress/`, {
        projectId: Number(projectId),
        orderNum: Number(orderNum),
        name,
      }),
    );
    yield put(
      createStatusesSuccess({
        progressStatusId: response.data.id,
        projectId: Number(projectId),
        orderNum: Number(orderNum),
        name,
      }),
    );
  } catch (error) {
    yield put(
      createStatusesError({
        response: error.response,
        error: error,
        data: error.response.data,
      }),
    );
  }
}

function* createTask(action) {
  yield put(createTaskStart());
  try {
    const response = yield call(() =>
      instance.post(`${REACT_APP_BACKEND_URL}/api/v1/tasks/`, {
        ...action.payload,
      }),
    );
    yield put(
      createTaskSuccess({
        taskId: response.data.id,
        ...action.payload,
      }),
    );
  } catch (error) {
    yield put(
      createTaskError({
        response: error.response,
        error: error,
        data: error.response.data,
      }),
    );
  }
}

function* updateTask(action) {
  yield put(updateTaskStart());
  try {
    yield call(() =>
      instance.put(`${REACT_APP_BACKEND_URL}/api/v1/tasks/`, {
        ...action.payload,
      }),
    );
    yield put(
      updateTaskSuccess({
        ...action.payload,
      }),
    );
  } catch (error) {
    yield put(
      updateTaskError({
        response: error.response,
        error: error,
        data: error.response.data,
      }),
    );
  }
}

function* deleteTask(action) {
  const { taskId, statusesId } = action.payload;
  yield put(deleteTaskStart());
  try {
    yield call(() => instance.delete(`${REACT_APP_BACKEND_URL}/api/v1/tasks/${taskId}`));
    yield put(deleteTaskSuccess({ taskId, statusesId }));
  } catch (error) {
    yield put(
      deleteTaskError({
        response: error.response,
        error: error,
        data: error.response.data,
      }),
    );
  }
}

function* UpdateProjectBoardParts(action) {
  const { items } = action.payload;
  console.log(items);
  yield put(UpdateProjectBoardPartsStart());
  try {
    yield call(() => instance.put(`${REACT_APP_BACKEND_URL}/api/v1/project-board/parts`, items));
    yield put(UpdateProjectBoardPartsSuccess(items));
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
function* UpdateProjectBoardProgressStatuses(action) {
  const { items } = action.payload;
  yield put(UpdateProjectBoardProgressStatusesStart());
  try {
    yield call(() => instance.put(`${REACT_APP_BACKEND_URL}/api/v1/project-board/statuses`, items));
    yield put(UpdateProjectBoardProgressStatusesSuccess(items));
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
function* UpdateProjectBoardProgressStatusTasks(action) {
  // console.log(action.payload);
  const { id, items } = action.payload;
  // console.log(id, items);
  yield put(UpdateProjectBoardProgressStatusTasksStart());
  try {
    yield call(() =>
      instance.put(`${REACT_APP_BACKEND_URL}/api/v1/project-board/status-tasks`, items),
    );
    // console.log("hello");
    yield put(UpdateProjectBoardProgressStatusTasksSuccess({ id, items }));
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
  yield takeEvery(types.createTask, createTask);
  yield takeEvery(types.updateTask, updateTask);
  yield takeEvery(types.deleteTask, deleteTask);
  yield takeEvery(types.createStatuses, createStatuses);
  yield takeEvery(types.UpdateProjectBoardParts, UpdateProjectBoardParts);
  yield takeEvery(types.UpdateProjectBoardProgressStatuses, UpdateProjectBoardProgressStatuses);
  yield takeEvery(
    types.UpdateProjectBoardProgressStatusTasks,
    UpdateProjectBoardProgressStatusTasks,
  );
}
