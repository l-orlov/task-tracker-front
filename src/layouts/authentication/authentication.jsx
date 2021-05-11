import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Input } from "../../components/";

import logoSvg from "../../logo.svg";

import "./authentication.scss";

const defaultValues = {
  password: "",
  email: "",
  firstName: "",
  lastName: "",
};

const loginFormFields = [
  { title: "Почта", name: "email", type: "text" },
  {
    title: "Пароль",
    name: "password",
    type: "password",
  },
];

const registrationFormFields = [
  { title: "Почти", name: "email", type: "text" },
  { title: "Имя", name: "firstName", type: "text" },
  { title: "Фамилия", name: "lastName", type: "text" },
  { title: "Пароль", name: "password", type: "password" },
];

export const Authentication = () => {
  const history = useHistory();
  const [isSignIn, setIsSignIn] = useState(true);
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  const memoizedArrayFields = isSignIn ? loginFormFields : registrationFormFields;

  const handleOnSignIn = (data) => {
    setIsSignIn(true);
    console.log(data);
    history.push("/projects");
  };
  const handleonSignUp = (data) => {
    setIsSignIn(!isSignIn);
    !isSignIn && console.log(data);
    reset();
  };

  return (
    <div className="authentication">
      <div className="authentication-wrapper">
        <div className="logo">
          <div>
            <img src={logoSvg} />
            <p className="logo-smile">: )</p>
          </div>

          <p
            style={{
              fontWeight: "bold",
            }}
          >
            Task-Tracker
          </p>
        </div>
        <div className="authentication-form">
          <form>
            {memoizedArrayFields.map((el) => (
              <Input
                key={el.name}
                className="authentication"
                register={register}
                title={el.title}
                name={el.name}
                type={el.type}
              />
            ))}
            <div className="authentication-buttongs">
              <button className="ds-button-shadow" onClick={handleSubmit(handleOnSignIn)}>
                Войти
              </button>
              <button className="ds-button-shadow" onClick={handleSubmit(handleonSignUp)}>
                {isSignIn ? "Регистрация" : "Зарегистрироваться"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
