import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Input } from "../../components/";

const defaultValues = {
  "name": "",
  "description": "",
};

const createProjectFormFields = [
  { title: "Название", name: "name", type: "text" },
  { title: "Описание", name: "description", type: "text" },
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
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {createProjectFormFields.map((el) => (
          <Input
            key={el.name}
            className="authentication"
            register={register}
            title={el.title}
            name={el.name}
            type={el.type}
          />
        ))}
      </form>
    </div>
  );
};
