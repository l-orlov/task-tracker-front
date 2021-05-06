import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./authentication.scss";
import logoSvg from "../../logo.svg";
const defaultValues = {
  password: "",
  login: "",
};

export const Authentication = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm({ defaultValues });

  const handleOnSignIn = (data) => {
    history.push("/tasks/board");
  };
  const handleonSignUp = () => {};

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
            <label className="authentication-password" htmlFor="password">
              <p>Пароль</p>
              <input {...register("password")} type="text" id="password" />
            </label>
            <label className="authentication-login" htmlFor="login">
              <p>Логин</p>
              <input {...register("login")} type="password" id="логин" />
            </label>
            <div className="authentication-buttongs">
              <button className="ds-button-shadow" onClick={handleSubmit(handleOnSignIn)}>
                Войти
              </button>
              <button className="ds-button-shadow" onClick={handleonSignUp}>
                Регистрация
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
