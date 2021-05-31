import React from "react";
import { useForm } from "react-hook-form";

import { Input } from "../../components/";

import "./createTask.scss";

const taskFields = [];

export const CreateStatuses = ({ setShowCreate }) => {
  const { register, handleSubmit } = useForm();
  const handleOnCreate = (data) => {
    console.log(data);
  };
  const handleOnCancel = () => {
    console.log("cancel");
  };
  return (
    <div className="createStatuses">
      {/* <div>
        <h2>Create statuses</h2>
        <p onClick={() => setShowCreate(false)}>close</p>
      </div>
      <form>
        <button onClick={handleSubmit(handleOnCreate)}>create</button>
        <button onClick={handleOnCancel}>cancel</button>
      </form> */}
    </div>
  );
};
