import React, { useEffect } from "react";
import "./Palette.css";
import Draggable from "../../Draggable/Draggable";
import { useSelector, useDispatch } from "react-redux";
import {
  setPalette,
  setAmount,
  setCurrentColor,
} from "../../Redux/GameController";

export const initialPalette = [
  {
    red: 255,
    green: 0,
    blue: 0,
  },
  {
    red: 0,
    green: 255,
    blue: 0,
  },
  {
    red: 255,
    green: 255,
    blue: 0,
  },
  {
    red: 0,
    green: 0,
    blue: 255,
  },
  {
    red: 0,
    green: 0,
    blue: 0,
  },
  {
    red: 255,
    green: 255,
    blue: 255,
  },
];

function Palette() {
  const dispatch = useDispatch();

  const gameController = useSelector((state) => state.GameController);

  useEffect(() => {
    dispatch(setPalette(initialPalette));
  }, []);

  const calculateStyle = (color) => {
    return {
      width: "clamp(75px, 7vw, 100px)",
      height: "clamp(75px, 7vw, 100px)",
      backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
      borderRadius: "10px",
      transform: "translate(0, 0)",
    };
  };

  const addButtonStyle = {
    width: "clamp(75px, 7vw, 100px)",
    height: "clamp(75px, 7vw, 100px)",
    border: "2px solid black",
    borderRadius: "10px",
    fontSize: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  };

  const checkAmount = (amount) => {
    if (gameController.amount === amount) return "selected-amount";
    else return "";
  };

  const changeAmountTiny = () => {
    dispatch(setAmount("tiny"));
  };

  const changeAmountSmall = () => {
    dispatch(setAmount("small"));
  };

  const changeAmountRegular = () => {
    dispatch(setAmount("regular"));
  };

  const addNewColor = () => {
    let currentColor = gameController.currentColor;
    if (!currentColor) return;
    dispatch(setPalette([...gameController.palette, currentColor]));
    dispatch(setCurrentColor(null));
  };

  const resetPalette = () => {
    dispatch(setPalette(initialPalette));
  };

  return (
    <div className="palette-container">
      <div className="palette">
        <div className="amount-selector">
          <div className="amount-label">Amount</div>
          <div
            className={`palette-button tiny ${checkAmount("tiny")}`}
            onClick={changeAmountTiny}
          />
          <div
            className={`palette-button small ${checkAmount("small")}`}
            onClick={changeAmountSmall}
          />
          <div
            className={`palette-button regular ${checkAmount("regular")}`}
            onClick={changeAmountRegular}
          />
        </div>
        {gameController.palette.map((color, index) => {
          return (
            <Draggable key={index} dragId={`color-${index}`}>
              <div className="palette-color" style={calculateStyle(color)} />
            </Draggable>
          );
        })}
        <div
          className="palette-add"
          style={addButtonStyle}
          onClick={addNewColor}
        >
          +
        </div>
        <div className="palette-reset-container">
          <div className="palette-reset" onClick={resetPalette}>
            Reset Palette
          </div>
        </div>
      </div>
    </div>
  );
}

export default Palette;
