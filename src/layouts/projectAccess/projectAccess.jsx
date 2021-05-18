import React, { useState, useEffect } from "react";

import { RadioButtonGroup } from "../../components/radioButtonGroup/";
import "./projectAccess.scss";

export const ProjectAccess = ({ setShowAccess }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="projectAccess">
      <div
        onClick={() => {
          setShowAccess(false);
        }}
      >
        close
      </div>
      <div></div>
      <button>delete project</button>
    </div>
  );
};
