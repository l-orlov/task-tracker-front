import React from "react";

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  // background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

export const Task = ({ provided, snapshot, content }) => {
  return (
    <div
      className="task"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      {content}
    </div>
  );
};
