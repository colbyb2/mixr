import { createSlice } from "@reduxjs/toolkit";
import { initialPalette } from "../components/elements/Palette";

const initialState = {
  correctColor: null,
  currentColor: null,
  amount: "regular",
  mixNumber: 0,
  palette: [],
};

const gameSlice = createSlice({
  name: "GameController",
  initialState,
  reducers: {
    setCorrectColor: (state, action) => {
      state.correctColor = action.payload;
    },
    setCurrentColor: (state, action) => {
      state.currentColor = action.payload;
    },
    incrementMixNumber: (state) => {
      state.mixNumber++;
    },
    resetMixNumber: (state) => {
      state.mixNumber = 0;
    },
    resetGame: (state) => {
      state.correctColor = null;
      state.currentColor = null;
      state.amount = "regular";
      state.mixNumber = 0;
      state.palette = initialPalette;
    },
    addColor: (state, action) => {
      state.palette = [...state.palette, action.payload];
    },
    setPalette: (state, action) => {
      state.palette = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const {
  setCorrectColor,
  setCurrentColor,
  incrementMixNumber,
  resetMixNumber,
  resetGame,
  addColor,
  setPalette,
  setAmount,
} = gameSlice.actions;

export default gameSlice.reducer;
