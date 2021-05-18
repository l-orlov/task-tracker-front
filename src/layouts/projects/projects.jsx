import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Input } from "../../components/";

import "./projects.scss";

const defaultValues = {
  "name": "",
  "description": "",
};

const createProjectFormFields = [
  { title: "Название", name: "name", type: "text", input: "input" },
  { title: "Описание", name: "description", type: "text", input: "textarea" },
];

export const Projects = ({ setNavigation }) => {
  const { id } = useParams();
  const { register, handleSubmit } = useForm(defaultValues);

  useEffect(() => {
    setNavigation([{ title: `project-1`, id: "board", path: `/projects/1/board` }]);
  }, [setNavigation, id]);

  const handleOnSubmit = (data) => {};

  return (
    <div className="projects">
      <h2>Создание проекта</h2>
      <form>
        {createProjectFormFields.map((el) => (
          <Input
            key={el.name}
            className="authentication"
            register={register}
            title={el.title}
            name={el.name}
            type={el.type}
            input={el.input}
          />
        ))}
        <button onClick={handleSubmit(handleOnSubmit)}>Создать проект</button>
      </form>
    </div>
  );
};
