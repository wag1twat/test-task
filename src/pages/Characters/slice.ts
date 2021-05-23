import { createSlice } from "@reduxjs/toolkit";
import { CharactersResponse } from "hooks/useCharacters";
import {
  fullfiledMarvelsCharacters,
  getMarvelsCharacters,
  rejectedMarvelsCharacters,
} from "hooks/useCharacters/getCharactersSaga";
import { BaseRequestError } from "types";

interface State extends Partial<CharactersResponse> {
  isLoading: boolean;
  error: BaseRequestError | null;
}

const initialState: State = { isLoading: false, error: null };

export const charactersSlice = createSlice({
  name: "charactersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMarvelsCharacters.type, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }));

    builder.addCase(
      fullfiledMarvelsCharacters.type,
      (state, action: ReturnType<typeof fullfiledMarvelsCharacters>) => ({
        ...state,
        isLoading: false,
        error: null,
        ...action.payload,
      })
    );

    builder.addCase(
      rejectedMarvelsCharacters.type,
      (state, action: ReturnType<typeof rejectedMarvelsCharacters>) => ({
        ...state,
        isLoading: false,
        error: action.payload,
      })
    );
  },
});
