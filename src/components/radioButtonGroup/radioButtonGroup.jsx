import React, { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import "./radioButtonGroup.scss";

export const RadioButtonGroup = ({ className, vertical, label, array, getValue }) => {
  const [state, setState] = useState({
    value: 0,
    visibility: [],
  });

  const classes = classNames(
    "radioButtonGroup",
    { [`radioB-${className}`]: className },
    { vertical: vertical },
  );

  useEffect(() => {
    let visibility = new Array(array.length).fill("hidden");
    setState({
      ...state,
      visibility,
    });
  }, []);

  const handleOnClick = (value) => {
    setState({
      ...state,
      value,
    });
    getValue(value);
  };

  return (
    <div className={classes}>
      {label && <span className="radioButtonGroup--label">{label}</span>}
      <div className="radioButtonGroup-buttons">
        {array.map((element) => (
          <p
            key={element.id}
            onClick={() => {
              handleOnClick(element.id);
            }}
            className={`radioButtonGroup--select ${state.value === element.id ? "active" : ""}`}
          >
            {element.value}
          </p>
        ))}
      </div>
    </div>
  );
};

RadioButtonGroup.propTypes = {
  label: PropTypes.string,
  vertical: PropTypes.bool,
  className: PropTypes.string,
  func: PropTypes.func,
  array: PropTypes.array,
};

RadioButtonGroup.defaultProps = {
  label: "",
  vertical: false,
  className: "",
  getValue: () => {},
  array: [],
};
