import React from "react";
import settingsSvg from "../svg/settings.svg";

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  // background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

export const Task = ({ provided, snapshot, content, handleOnUpdateTask, statusesId, taskId }) => {
  return (
    <div
      className="task"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <p>{content}</p>
      <img src={settingsSvg} alt="update" onClick={() => handleOnUpdateTask(statusesId, taskId)} />
    </div>
  );
};
