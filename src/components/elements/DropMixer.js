import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";

function DropMixer({ drop }) {
  const currentColor = useSelector(
    (state) => state.GameController.currentColor
  );

  const dropStyle = useSpring({
    backgroundColor: currentColor
      ? `rgb(${currentColor.red},${currentColor.green},${currentColor.blue})`
      : "rgb(255, 255, 255)",
    width: "clamp(125px, 20vw, 200px)",
    height: "clamp(125px, 20vw, 200px)",
    border: drop ? "7px solid green" : "1px solid grey",
    borderRadius: "10px",
    boxShadow: "0px 5px 13px -7px #000000",
    margin: "3rem",
  });

  return (
    <div>
      <animated.div style={dropStyle} />
    </div>
  );
}

export default DropMixer;
