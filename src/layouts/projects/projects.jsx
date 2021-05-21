import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Input } from "../../components/";
import { createProject, getProjects } from "../../model/projects/actions";

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
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm(defaultValues);

  const isCreated = useSelector((state) => state.projects.isCreated);
  const projects = useSelector((state) => state.projects.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    isCreated && dispatch(getProjects());
  }, [isCreated]);

  useEffect(() => {
    const nav = projects.map((el) => ({
      title: el.name,
      id: el.id,
      path: `/projects/${el.id}/board`,
    }));

    setNavigation(nav);
  }, [setNavigation, projects]);

  const handleOnSubmit = (data) => {
    dispatch(createProject(data));
  };

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
