import React, { useState, useEffect } from "react";

import { RadioButtonGroup } from "../../components/radioButtonGroup/";
import "./projectDetails.scss";

export const ProjectDetails = ({ setShowDetails }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="projectDetails">
      <div
        onClick={() => {
          setShowDetails(false);
        }}
      >
        close
      </div>
      <div>
        <div>
          <h3>Name</h3>
          <p>pr1</p>
        </div>
        <div>
          <h3>Description</h3>
          <p>some description</p>
        </div>
        <div>
          <h3>Importance statuses</h3>
          <RadioButtonGroup
            array={[
              {
                "id": 1,
                "projectId": 1,
                "value": "LOW",
              },
              {
                "id": 2,
                "projectId": 1,
                "value": "MEDIUM",
              },
              {
                "id": 3,
                "projectId": 1,
                "value": "HIGH",
              },
              {
                "id": 4,
                "projectId": 1,
                "value": "SUPER HIGH",
              },
            ]}
            getValue={setValue}
          />
        </div>
      </div>
      <button>delete project</button>
    </div>
  );
};
