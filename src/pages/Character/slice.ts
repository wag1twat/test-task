import { createSlice } from "@reduxjs/toolkit";
import {
  fullfiledMarvelsCharacter,
  getMarvelsCharacter,
  rejectedMarvelsCharacter,
} from "hooks/useCharacter";
import { Character } from "hooks/useCharacters";
import { BaseRequestError } from "types";

interface UsersState {
  data: Partial<Character>;
  isLoading: boolean;
  error: BaseRequestError | null;
}

const initialState: UsersState = { data: {}, isLoading: false, error: null };

export const characterSlice = createSlice({
  name: "characterSlice",
  initialState,
  reducers: {
    clearCharacterSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getMarvelsCharacter.type, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }));

    builder.addCase(
      fullfiledMarvelsCharacter.type,
      (state, { payload }: ReturnType<typeof fullfiledMarvelsCharacter>) => ({
        ...state,
        data: payload,
        isLoading: false,
        error: null,
      })
    );

    builder.addCase(
      rejectedMarvelsCharacter.type,
      (state, { payload }: ReturnType<typeof rejectedMarvelsCharacter>) => ({
        ...state,
        isLoading: false,
        error: payload,
      })
    );
  },
});

export const { clearCharacterSlice } = characterSlice.actions;
