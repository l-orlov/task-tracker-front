import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";

import { Input } from "../../components/";
import { updateTask, deleteTask } from "../../model/board/actions";

import "./updateTask.scss";

const taskFields = [
  { title: "title", name: "title", type: "text" },
  { title: "description", name: "description", type: "text" },
  // { title: "assignee", name: "assignee", type: "text" },
  // { title: "importance status", name: "iStatus", type: "text" },
  // { title: "progress status", name: "pStatus", type: "text" },
];

export const UpdateTask = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { id, statusesId, taskId } = useParams();

  const handleOnUpdate = (data) => {
    dispatch(
      updateTask({
        "id": Number(taskId),
        "projectId": Number(id),
        "title": data.title,
        "description": data.description,
        "assigneeId": 2,
        "importanceStatusId": 2,
        "progressStatusId": Number(statusesId),
      }),
    );
    history.push(`/projects/${id}/board`);
    // setShowUpdate(false);
  };
  const handleOnCancel = () => {
    history.push(`/projects/${id}/board`);
    // setShowUpdate(false);
  };

  const handleOnDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTask({ taskId, id, statusesId }));
    history.push(`/projects/${id}/board`);
  };
  return (
    <div className="updateTask">
      <h2>Update Task</h2>
      <form>
        {taskFields.map((el) => (
          <Input
            key={el.name}
            className="updateTask"
            register={register}
            title={el.title}
            name={el.name}
            type={el.type}
          />
        ))}
        <button onClick={handleSubmit(handleOnUpdate)}>update</button>
        <button onClick={handleOnCancel}>cancel</button>
        <button onClick={handleOnDelete}>delete</button>
      </form>
    </div>
  );
};
