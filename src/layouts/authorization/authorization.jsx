import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { Input } from "../../components/";
import { authorization, registration } from "../../model/user/actions";

import logoSvg from "../../logo.svg";

import "./authorization.scss";

const defaultValues = {
  password: "123",
  email: "test@gmail.com",
  firstName: "",
  lastName: "",
  fingerprint: "some_fingerprint",
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

export const Authorization = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  const memoizedArrayFields = isSignIn ? loginFormFields : registrationFormFields;

  const handleOnSignIn = (data) => {
    setIsSignIn(true);
    dispatch(authorization(data));
  };
  const handleonSignUp = (data) => {
    setIsSignIn(!isSignIn);
    !isSignIn && dispatch(registration(data));
    reset();
  };

  return (
    <div className="authorization">
      <div className="authorization-wrapper">
        <div className="logo">
          <div>
            <img src={logoSvg} alt="" />
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
        <div className="authorization-form">
          <form>
            {memoizedArrayFields.map((el) => (
              <Input
                key={el.name}
                className="authorization"
                register={register}
                title={el.title}
                name={el.name}
                type={el.type}
              />
            ))}
            <div className="authorization-buttongs">
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
