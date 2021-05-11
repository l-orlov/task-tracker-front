import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import produce from "immer";
import { v4 as uuid } from "uuid";

import { Task } from "./task/task";

import confirmSvg from "./svg/confirm.svg";
import candelSvg from "./svg/cancel.svg";

import "./style.scss";

const structTask = {
  id: "",
  title: "",
  user: "",
};

const structProgressStatus = {
  id: "",
  confirmed: false,
  title: "",
  tasks: [],
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

export const TasksBoard = ({ setNavigation }) => {
  const statusesRef = useRef(null);
  const { id } = useParams();
  const [state, setState] = useState([]);
  const [isAbleAddNew, setIsAbleAddNew] = useState(true);
  const [position, setPostion] = useState(0);

  const ScrollListener = () => {
    setPostion(statusesRef.current.scrollLeft);
  };

  useEffect(() => {
    setNavigation([
      { title: "board", id: "board", path: `/projects/${id}/board` },
      // { title: "project settings", id: "settings", path: `/projects/${id}/settings` },
    ]);
  }, [setNavigation, id]);

  useEffect(() => {
    statusesRef.current.addEventListener("scroll", ScrollListener);
    return () => statusesRef.current.removeEventListener("scroll", ScrollListener);
  }, []);

  const AddNewStatuses = () => {
    const projs = [...state];
    const id = uuid();
    projs.push({ ...structProgressStatus, id: `statuses-${id}` });
    setState(projs);
    setIsAbleAddNew(false);
  };

  const AddNewTask = (id) => {
    state.find((el) => el.id === id);
    const updatedProject = produce(state, (draftProj) => {
      const tasks = draftProj.find((el) => el.id === id).tasks;
      const newId = uuid();
      tasks.push({ ...structTask, id: newId, title: newId });
    });
    setState(updatedProject);
    // setIsAbleAddNew(true);
  };

  const getList = (id) => state.find((el) => el.id === id).tasks;

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId !== "statuses") {
      if (source.droppableId === destination.droppableId) {
        const items = reorder(getList(source.droppableId), source.index, destination.index);
        const updatedProject = produce(state, (draftProj) => {
          const proj = draftProj.find((el) => el.id === source.droppableId);
          proj.tasks = items;
        });
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
            if (result[proj.id]) {
              proj.tasks = result[proj.id];
            }
          }
        });
        setState(updatedProject);
      }
    } else {
      const updatedProject = reorder(state, source.index, destination.index);
      setState(updatedProject);
    }
  };

  const handleOnChangeTitle = ({ target }, id) => {
    const updatedProject = produce(state, (draftProj) => {
      const proj = draftProj.find((el) => el.id === id);
      proj.title = target.value;
    });
    setState(updatedProject);
  };
  const handleOnKeyDownTitle = ({ keyCode }, id) => {
    if (keyCode === 13) {
      const updatedProject = produce(state, (draftProj) => {
        const proj = draftProj.find((el) => el.id === id);
        if (proj.title) {
          proj.confirmed = true;
        }
      });
      setState(updatedProject);
      setIsAbleAddNew(true);
    }
  };

  const handleOnConfirmStatuses = (id) => {
    const updatedProject = produce(state, (draftProj) => {
      const proj = draftProj.find((el) => el.id === id);
      if (proj.title) {
        proj.confirmed = true;
      }
    });
    setState(updatedProject);
    setIsAbleAddNew(true);
  };

  const handleOnDeleteStatuses = (id) => {
    const updatedProject = produce(state, (draftProj) => {
      const index = draftProj.indexOf(draftProj.find((el) => el.id === id));
      draftProj.splice(index, 1);
    });
    setState(updatedProject);
    setIsAbleAddNew(true);
  };

  return (
    <div className="board">
      <DragDropContext className="dnd-form" onDragEnd={onDragEnd}>
        <Droppable droppableId="statuses" type="STATUSES" direction="horizontal">
          {(providedStatuses, _) => (
            <div ref={providedStatuses.innerRef}>
              <div className={`sticky-shadow ${position >= 10 ? "show" : "hidden"}`}></div>
              <div className="board-statuses" ref={statusesRef}>
                {state.map((statuses, index) => (
                  <Draggable key={statuses.id} draggableId={statuses.id} index={index}>
                    {(provided, _) => (
                      <div
                        className="board--tasks"
                        key={statuses.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div className="board-tasks--wrapper">
                          <div className="board--tasks-header">
                            {statuses.confirmed ? (
                              <p {...provided.dragHandleProps}>{statuses.title}</p>
                            ) : (
                              <div>
                                <input
                                  onKeyDown={(e) => handleOnKeyDownTitle(e, statuses.id)}
                                  onChange={(e) => handleOnChangeTitle(e, statuses.id)}
                                />
                                <div>
                                  <img
                                    src={confirmSvg}
                                    alt="confirm"
                                    onClick={() => handleOnConfirmStatuses(statuses.id)}
                                  />
                                  <img
                                    src={candelSvg}
                                    alt="delete"
                                    onClick={() => handleOnDeleteStatuses(statuses.id)}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <Droppable droppableId={statuses.id}>
                            {(provided, snapshot) => (
                              <div
                                className="board--task"
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                              >
                                {statuses.tasks.map((item, index) => (
                                  <div style={{ height: 50 }} key={item.id}>
                                    <Draggable draggableId={item.id} index={index}>
                                      {(provided, snapshot) => (
                                        <Task
                                          provided={provided}
                                          snapshot={snapshot}
                                          content={item.id}
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
                            onClick={() => AddNewTask(statuses.id)}
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
  );
};
