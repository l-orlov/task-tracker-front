import React from "react";

export const Input = ({ className, name, title, register, type }) => {
  return (
    <label className={`${className}-${name}`} htmlFor={name}>
      <p>{title}</p>
      <input {...register(name)} type={type} id={name} />
    </label>
  );
};
