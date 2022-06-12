import React from "react";

function generateColor() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  return { red, green, blue };
}

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export async function initialColorPick(setColor) {
  for (let i = 0; i < 7; i++) {
    setColor(generateColor());
    await timer(i * 150);
  }
}

export const isMatch = (color1, color2) => {
  let r = Math.abs(color1.red - color2.red);
  let g = Math.abs(color1.green - color2.green);
  let b = Math.abs(color1.blue - color2.blue);

  let minVal = 75;

  let rBool = r <= minVal;
  let gBool = g <= minVal;
  let bBool = b <= minVal;

  if (rBool && gBool && bBool) {
    return true;
  } else {
    return false;
  }
};
