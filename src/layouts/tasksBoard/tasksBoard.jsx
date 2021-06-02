import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import produce from "immer";
import { v4 as uuid } from "uuid";

import { Task } from "./task/task";

import confirmSvg from "./svg/confirm.svg";
import candelSvg from "./svg/cancel.svg";

// import { Portal } from "../../components/portal/";

// import { ProjectDetails } from "../projectDetails/";
// import { ProjectAccess } from "../projectAccess/";
// import { UpdateTask } from "../updateTask/";
// import { CreateTask } from "../createTask/";

import {
  getProjectBoard,
  createStatuses,
  UpdateProjectBoardProgressStatusTasks,
  UpdateProjectBoardProgressStatuses,
  UpdateProjectBoardParts,
} from "../../model/board/actions";
// import

import "./tasksBoard.scss";

// const structTask = {
//   "assigneeAvatarURL": "",
//   "assigneeFirstname": "",
//   "assigneeId": 0,
//   "assigneeLastname": "",
//   "taskId": 0,
//   "taskOrderNum": 0,
//   "taskTitle": "",
//   // title: "",
// };

const structProgressStatus = {
  // id: "", // progressStatusId
  confirmed: false,
  tasks: [],
  progressStatusId: "",
  progressStatusName: "",
  progressStatusOrderNum: 0,
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
});
////////////////////////////////////////////////////////////////////////////////////////////////
window["__react-beautiful-dnd-disable-dev-warnings"] = true;
////////////////////////////////////////////////////////////////////////////////////////////////
export const TasksBoard = ({ setNavigation }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const statusesRef = useRef(null);
  const { id } = useParams();

  const [state, setState] = useState([]);
  const [isAbleAddNew, setIsAbleAddNew] = useState(true);
  const [position, setPostion] = useState(0);

  const projectBoard = useSelector((state) => state.board.projectBoard);

  const ScrollListener = () => {
    setPostion(statusesRef.current.scrollLeft);
  };

  useEffect(() => {
    setState(projectBoard);
  }, [projectBoard]);

  useEffect(() => {
    console.log("pewpew", state);
  }, [state]);

  useEffect(() => {
    setNavigation([
      { title: "board", id: "board", path: `/projects/${id}/board` },
      // { title: "project settings", id: "settings", path: `/projects/${id}/settings` },
    ]);
  }, [setNavigation, id]);

  useEffect(() => {
    dispatch(getProjectBoard({ id }));
    statusesRef.current.addEventListener("scroll", ScrollListener);
    return () =>
      statusesRef.current && statusesRef.current.removeEventListener("scroll", ScrollListener);
  }, [dispatch, id]);

  const AddNewStatuses = () => {
    const projs = [...state];
    const id = uuid();
    projs.push({ ...structProgressStatus, progressStatusId: `statuses-${id}` });
    setState(projs);
    setIsAbleAddNew(false);
  };

  const AddNewTask = (statusesId) => {
    const tmpId = statusesId.slice("statuses-".length, statusesId.length);
    history.replace(`/projects/${id}/board/statuses/${tmpId}/create_task`);
  };

  const getList = (id) => state.find((el) => el.progressStatusId === id).tasks;

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId !== "statuses") {
      if (source.droppableId === destination.droppableId) {
        const items = reorder(getList(source.droppableId), source.index, destination.index);
        const updatedProject = produce(state, (draftProj) => {
          const proj = draftProj.find((el) => el.progressStatusId === source.droppableId);
          proj.tasks = items;
        });
        dispatch(
          UpdateProjectBoardProgressStatusTasks({
            id: Number(
              destination.droppableId.slice("statuses-".length, destination.droppableId.length),
            ),
            items: items.map((el, i) => ({
              ...el,
              taskId: Number(el.taskId.slice("task-".length, el.taskId.length)),
              taskOrderNum: i,
            })),
          }),
        );

        setState(updatedProject);
      } else {
        const result = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination,
        );
        const updatedProject = produce(state, (draftProj) => {
          for (let proj of draftProj) {
            if (result[proj.progressStatusId]) {
              proj.tasks = result[proj.progressStatusId];
            }
          }
        });

        const srcStatuses = {
          ...updatedProject.find((el) => el.progressStatusId === source.droppableId),
        };
        const dstStatuses = {
          ...updatedProject.find((el) => el.progressStatusId === destination.droppableId),
        };
        dispatch(
          UpdateProjectBoardParts({
            items: [
              {
                ...srcStatuses,
                progressStatusId: Number(
                  srcStatuses.progressStatusId.slice(
                    "statuses-".length,
                    srcStatuses.progressStatusId.length,
                  ),
                ),
                tasks: srcStatuses.tasks.map((el) => ({
                  ...el,
                  taskId: Number(el.taskId.slice("task-".length, el.taskId.length)),
                })),
              },
              {
                ...dstStatuses,
                progressStatusId: Number(
                  dstStatuses.progressStatusId.slice(
                    "statuses-".length,
                    dstStatuses.progressStatusId.length,
                  ),
                ),
                tasks: dstStatuses.tasks.map((el) => ({
                  ...el,
                  taskId: Number(el.taskId.slice("task-".length, el.taskId.length)),
                })),
              },
            ],
          }),
        );

        setState(updatedProject);
      }
    } else {
      const updatedProject = reorder(state, source.index, destination.index);
      dispatch(
        UpdateProjectBoardProgressStatuses({
          items: updatedProject.map((el, i) => ({
            ...el,
            progressStatusId: Number(
              el.progressStatusId.slice("statuses-".length, el.progressStatusId.length),
            ),
            progressStatusOrderNum: i,
          })),
        }),
      );
      setState(updatedProject);
    }
  };

  const handleOnChangeTitle = ({ target }, id) => {
    const updatedProject = produce(state, (draftProj) => {
      const proj = draftProj.find((el) => el.progressStatusId === id);
      proj.title = target.value;
    });
    setState(updatedProject);
  };

  const handleOnKeyDownTitle = ({ keyCode }, id) => {
    if (keyCode === 13) {
      const updatedProject = produce(state, (draftProj) => {
        const proj = draftProj.find((el) => el.progressStatusId === id);
        if (proj.title) {
          proj.confirmed = true;
        }
      });
      setState(updatedProject);
      setIsAbleAddNew(true);
    }
  };

  const handleOnConfirmStatuses = (idStatuses) => {
    const obj = state.find((el) => el.progressStatusId === idStatuses);
    dispatch(createStatuses({ projectId: id, name: obj.title, orderNum: state.length }));
    setIsAbleAddNew(true);
  };

  const handleOnDeleteStatuses = (id) => {
    const updatedProject = produce(state, (draftProj) => {
      const index = draftProj.indexOf(draftProj.find((el) => el.progressStatusId === id));
      draftProj.splice(index, 1);
    });
    setState(updatedProject);
    setIsAbleAddNew(true);
  };

  const handleOnClickDetails = (id) => {
    // setShowDetails(true);
  };
  const handleOnClickAccess = (id) => {
    // setShowAccess(true);
  };

  const handleOnUpdateTask = (statusesId, taskId) => {
    // setShowUpdate(true);
    const tmpStatusesId = statusesId.slice("statuses-".length, statusesId.length);
    const tmpTaskId = taskId.slice("task-".length, taskId.length);
    history.replace(`/projects/${id}/board/statuses/${tmpStatusesId}/update_task/${tmpTaskId}`);
  };

  // const handleOnClickUpdate = () => {};

  return (
    <div id="board" className="board">
      <div className="board-head">
        <h2>Статусы выполнения</h2>
        <div>
          <p onClick={() => handleOnClickDetails(id)}>Details</p>
          <p onClick={() => handleOnClickAccess(id)}>Access</p>
        </div>
      </div>

      <div className="board-content">
        <DragDropContext className="dnd-form" onDragEnd={onDragEnd}>
          <Droppable droppableId="statuses" type="STATUSES" direction="horizontal">
            {(providedStatuses, _) => (
              <div ref={providedStatuses.innerRef}>
                <div className={`sticky-shadow ${position >= 10 ? "show" : "hidden"}`}></div>
                <div className="board-statuses" ref={statusesRef}>
                  {state.map((statuses, index) => (
                    <Draggable
                      key={statuses.progressStatusId}
                      draggableId={statuses.progressStatusId}
                      index={index}
                    >
                      {(provided, _) => (
                        <div
                          className="board--tasks"
                          key={statuses.progressStatusId}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div className="board-tasks--wrapper">
                            <div className="board--tasks-header">
                              {statuses.confirmed ? (
                                <div {...provided.dragHandleProps}>
                                  <p>{statuses.progressStatusName}</p>
                                </div>
                              ) : (
                                <div>
                                  <input
                                    onKeyDown={(e) =>
                                      handleOnKeyDownTitle(e, statuses.progressStatusId)
                                    }
                                    onChange={(e) =>
                                      handleOnChangeTitle(e, statuses.progressStatusId)
                                    }
                                  />
                                  <div>
                                    <img
                                      src={confirmSvg}
                                      alt="confirm"
                                      onClick={() =>
                                        handleOnConfirmStatuses(statuses.progressStatusId)
                                      }
                                    />
                                    <img
                                      src={candelSvg}
                                      alt="delete"
                                      onClick={() =>
                                        handleOnDeleteStatuses(statuses.progressStatusId)
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                            <Droppable droppableId={statuses.progressStatusId}>
                              {(provided, snapshot) => (
                                <div
                                  className="board--task"
                                  ref={provided.innerRef}
                                  style={getListStyle(snapshot.isDraggingOver)}
                                >
                                  {statuses.tasks.map((item, index) => (
                                    <div style={{ height: 50 }} key={item.taskId}>
                                      <Draggable draggableId={item.taskId} index={index}>
                                        {(provided, snapshot) => (
                                          <Task
                                            provided={provided}
                                            snapshot={snapshot}
                                            content={item.taskTitle}
                                            taskId={item.taskId}
                                            statusesId={statuses.progressStatusId}
                                            handleOnUpdateTask={handleOnUpdateTask}
                                          />
                                        )}
                                      </Draggable>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </Droppable>
                            <button
                              disabled={!statuses.confirmed}
                              onClick={() => AddNewTask(statuses.progressStatusId)}
                            >
                              create task
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>

                <button
                  disabled={!isAbleAddNew}
                  className="board--add-statuses"
                  onClick={AddNewStatuses}
                >
                  +
                </button>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
