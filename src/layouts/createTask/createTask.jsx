import React from "react";
import { useForm } from "react-hook-form";

import { Input } from "../../components/";

import "./createTask.scss";

const taskFields = [
  { title: "title", name: "title", type: "text" },
  { title: "description", name: "description", type: "text" },
  { title: "assignee", name: "assignee", type: "text" },
  { title: "importance status", name: "iStatus", type: "text" },
  { title: "progress status", name: "pStatus", type: "text" },
];

export const CreateTask = ({ setShowCreate }) => {
  const { register, handleSubmit } = useForm();
  const handleOnCreate = (data) => {
    console.log(data);
  };
  const handleOnCancel = () => {
    console.log("cancel");
  };
  return (
    <div className="createTask">
      <div>
        <h2>Create Task</h2>
        <p onClick={() => setShowCreate(false)}>close</p>
      </div>
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
