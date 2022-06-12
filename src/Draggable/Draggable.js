import React, { Children, useState } from "react";
import "./Draggable.css";

/*
 * Draggable component
 * Enables any element to be drag and droppable when wrapped
 *
 * children - child to display
 * dragId - id of dragging element
 * dragStart - callback function of dragging start
 * dragEnd - callback function of dragging end
 * draggable - can be dragged when true, can't be dragged otherwise
 *
 */
function Draggable({
  children,
  dragId,
  dragStart = () => {},
  dragEnd = () => {},
  draggable = "true",
}) {
  const [dragging, setDragging] = useState(false);

  //Checks to ensure that only a single child is passed
  const singleChild = (children) => {
    return Children.only(children);
  };

  //When item gets dragged
  const onDragStart = (dragEvent) => {
    dragEvent.dataTransfer.setData("text", dragEvent.target.dataset.dragid);
    document.body.style.cursor = "grabbing";

    dragStart();

    // setTimeout(() => {
    //   setDragging(true);
    //   dragStart();
    // }, 0);
  };

  //When item gets released
  const onDragEnd = (dragEvent) => {
    document.body.style.cursor = "default";
    setDragging(false);
    dragEnd();
  };

  return (
    <div
      className="draggable"
      draggable={draggable}
      data-dragid={`${dragId}`}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={children.props.style}
    >
      {!dragging && singleChild(children)}
    </div>
  );
}

/*
 * Droppable Component
 * Allows whatever this wraps to become a droppable target
 *
 * children - child component
 * dropped - callback function triggered on drop
 * dragOver - callback function triggered on drag over
 * dragExit - callback function triggered on drag exit
 */
export const Droppable = ({
  children,
  dropped = () => {},
  dragOver = () => {},
  dragLeave = () => {},
}) => {
  //Checks to ensure that only a single child is passed
  const singleChild = (children) => {
    return Children.only(children);
  };

  //Element is dragged over
  const onDragOver = (e) => {
    e.dataTransfer.dropEffect = "move";
    e.stopPropagation();
    e.preventDefault();
    dragOver();
  };

  //Element gets dropped on
  const onDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let id = e.dataTransfer.getData("text");
    dropped(id);
  };

  const onDragLeave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dragLeave();
  };

  return (
    <div onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
      {singleChild(children)}
    </div>
  );
};

export default Draggable;
