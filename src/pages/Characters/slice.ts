import { createSlice } from "@reduxjs/toolkit";
import { getMarvelsCharacters } from "hooks/useCharacters/getCharactersSaga";

interface State {}

const initialState: State = {};

export const charactersSlice = createSlice({
  name: "charactersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMarvelsCharacters.type, (state, action) => {
      console.log(action);

      return { ...state };
    });
  },
});
