import React from "react";
import { useForm } from "react-hook-form";

import "./authentication.scss";

const defaultValues = {
  password: "",
  login: "",
};

export const Authentication = () => {
  const { register, handleSubmit } = useForm({ defaultValues });

  const handleOnSignIn = (data) => {
    console.log(data);
  };
  const handleonSignUp = () => {};

  return (
    <div className="authentication">
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
  );
};
