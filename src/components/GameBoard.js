import React, { useState } from "react";
import Drop from "./elements/Drop";
import DropMixer from "./elements/DropMixer";
import Palette from "./elements/Palette";
import { Droppable } from "../Draggable/Draggable";
import {
  setCurrentColor,
  incrementMixNumber,
  resetGame,
} from "../Redux/GameController";
import { useDispatch, useSelector } from "react-redux";
import { isMatch } from "./elements/DropLogic";

function GameBoard() {
  const [droppable, setDroppable] = useState(false);
  const [won, setWon] = useState(true);
  const [newColor, setNewColor] = useState(false);

  const gameController = useSelector((state) => state.GameController);

  const dispatch = useDispatch();

  const dragOver = () => {
    setDroppable(true);
  };

  const dragLeave = () => {
    setDroppable(false);
  };

  const dropped = (id) => {
    setDroppable(false);

    let colorId = id.split("-")[1];
    if (colorId === undefined) return;
    let mixColor = gameController.palette[colorId];
    let oldColor = gameController.currentColor;
    dispatch(incrementMixNumber());
    if (oldColor) {
      let newColor = mixColors(mixColor, oldColor, gameController.amount);
      dispatch(setCurrentColor(newColor));
      if (isMatch(gameController.correctColor, newColor)) {
        //Win
        setTimeout(() => {
          setWon(true);
        }, 750);
      }
    } else {
      dispatch(setCurrentColor(mixColor));
    }
  };

  const playAgain = () => {
    dispatch(resetGame());
    setWon(false);
    setNewColor(true);
  };

  return (
    <div className="gameBoard">
      <Drop newColor={newColor} setNewColor={setNewColor} />
      <RGBDisplay color={gameController.correctColor} />
      <Droppable dragOver={dragOver} dragLeave={dragLeave} dropped={dropped}>
        <DropMixer drop={droppable} />
      </Droppable>
      <RGBDisplay color={gameController.currentColor} />
      <Palette />
      {won && (
        <WinModal guesses={gameController.mixNumber} playAgain={playAgain} />
      )}
    </div>
  );
}

function WinModal({ guesses, playAgain }) {
  const modalStyle = {
    position: "fixed",
    width: "40vw",
    height: "30vw",
    top: "50%",
    left: "50%",
    marginTop: "-15vw",
    marginLeft: "-20vw",
    backgroundColor: "whitesmoke",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    border: "3px solid slateblue",
  };

  const titleStyle = {
    fontSize: "1.4rem",
  };

  const guessStyle = {
    fontSize: "1.3rem",
  };

  const buttonStyle = {
    width: "fit-content",
    padding: "3%",
    backgroundColor: "darkgrey",
    border: "1px solid black",
    cursor: "pointer",
    transition: "all 200ms ease-in-out",
  };

  return (
    <div style={modalStyle}>
      <div style={titleStyle}>You Won!</div>
      <div style={guessStyle}>{`It took you ${guesses} guesses!`}</div>
      <div
        className="play-again-button"
        style={buttonStyle}
        onClick={playAgain}
      >
        Play Again
      </div>
    </div>
  );
}

function RGBDisplay({ color }) {
  return (
    <div>{color ? `RGB(${color.red}, ${color.green}, ${color.blue})` : ""}</div>
  );
}

/*
Function for mixing two rgb colors and returning result
first - first color
second - second color
*/
function mixColors(first, second, amount) {
  //Red value
  let red = rgbValue(first.red, second.red, amount);
  //Green value
  let green = rgbValue(first.green, second.green, amount);
  //Blue value
  let blue = rgbValue(first.blue, second.blue, amount);

  return { red, green, blue };
}

/*
Function for getting value of each rgb number
first - first number
second - second number
*/
function rgbValue(first, second, amount) {
  let firstNum = first;
  if (amount === "tiny") {
    firstNum = Math.floor(first * 3);
  } else if (amount === "small") {
    firstNum = Math.floor(first * 2);
  }
  let sum = first + second;
  let value = Math.floor(sum / 2);
  return value > 255 ? 255 : value;
}

export default GameBoard;
