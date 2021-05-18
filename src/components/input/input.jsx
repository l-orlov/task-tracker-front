import React from "react";
import PropTypes from "prop-types";

import "./input.scss";

export const Input = ({ className, name, title, register, type, tag }) => {
  const Tag = tag === "input" ? "input" : "textarea";
  return (
    <label className={`input ${className}-${name}`} htmlFor={name}>
      <p>{title}</p>
      <Tag {...register(name)} type={type} id={name} />
    </label>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  register: PropTypes.func,
  type: PropTypes.string,
  tag: PropTypes.string,
};

Input.defaultProps = {
  className: "",
  name: "",
  title: "",
  type: "",
  tag: "input",
  register: () => {},
};
