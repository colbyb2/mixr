import React, { useEffect, useState } from "react";
import { initialColorPick } from "./DropLogic";
import { useSpring, animated } from "react-spring";
import { useDispatch } from "react-redux";
import { setCorrectColor } from "../../Redux/GameController";

function Drop({ newColor, setNewColor }) {
  const initialColor = { red: 245, green: 200, blue: 155 };
  const [color, setColor] = useState(initialColor);

  const dispatch = useDispatch();

  const dropStyle = useSpring({
    backgroundColor: `rgb(${color.red},${color.green},${color.blue})`,
    width: "clamp(125px, 20vw, 200px)",
    height: "clamp(125px, 20vw, 200px)",
    border: "1px solid grey",
    borderRadius: "10px",
    boxShadow: "0px 5px 13px -7px #000000",
    margin: "3rem",
  });

  useEffect(() => {
    initialColorPick(setColor).then(() => {
      dispatch(setCorrectColor(color));
    });
  }, []);

  useEffect(() => {
    if (newColor) {
      initialColorPick(setColor).then(() => {
        dispatch(setCorrectColor(color));
        setNewColor(false);
      });
    }
  }, [newColor]);

  return (
    <div>
      <animated.div style={dropStyle} />
    </div>
  );
}

export default Drop;
