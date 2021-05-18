import React from "react";
import ReactDOM from "react-dom";
import "./portal.scss";

export const Portal = ({ children, idNode }) => {
  const el = document.getElementById(idNode);

  return ReactDOM.createPortal(<div id="portal">{children}</div>, el);
};
