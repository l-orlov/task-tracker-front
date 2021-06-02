import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";

import { createTask } from "../../model/board/actions";

import { Input } from "../../components/";

import "./createTask.scss";

const taskFields = [
  { title: "title", name: "title", type: "text" },
  { title: "description", name: "description", type: "text" },
  // { title: "assignee", name: "assignee", type: "text" },
  // { title: "importance status", name: "iStatus", type: "text" },
  // { title: "progress status", name: "pStatus", type: "text" },
];

export const CreateTask = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { id, statusesId } = useParams();

  const handleOnCreate = (data) => {
    dispatch(
      createTask({
        "projectId": Number(id),
        "title": data.title,
        "description": data.description,
        "assigneeId": 1,
        "importanceStatusId": 2,
        "progressStatusId": Number(statusesId),
      }),
    );
    history.push(`/projects/${id}/board`);
  };
  const handleOnCancel = () => {
    history.push(`/projects/${id}/board`);
  };
  return (
    <div className="createTask">
      <h2>Create Task</h2>
      <form>
        {taskFields.map((el) => (
          <Input
            key={el.name}
            className="createTask"
            register={register}
            title={el.title}
            name={el.name}
            type={el.type}
          />
        ))}
        <button onClick={handleSubmit(handleOnCreate)}>create</button>
        <button onClick={handleOnCancel}>cancel</button>
      </form>
    </div>
  );
};
