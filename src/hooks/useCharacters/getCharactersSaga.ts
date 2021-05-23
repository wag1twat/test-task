import { createAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { CharacterQueries, CharactersResponse } from "./types";
import { createHash } from "utils";
import { BaseRequestError } from "types";

export const getMarvelsCharacters = createAction(
  "get/marvels/characters",
  (payload: Partial<CharacterQueries> = {}) => ({ payload })
);

export const fullfiledMarvelsCharacters = createAction(
  "fullfiled/marvels/characters",
  (payload: CharactersResponse) => ({ payload })
);

export const rejectedMarvelsCharacters = createAction(
  "rejected/marvels/characters",
  (payload: BaseRequestError | null) => ({ payload })
);

function* workerMarvelsCharacters(
  action: ReturnType<typeof getMarvelsCharacters>
) {
  const timestamp = new Date().getTime();

  const hash = createHash(timestamp);

  try {
    const characters: AxiosResponse<CharactersResponse> = yield call(() =>
      axios.get("https://gateway.marvel.com/v1/public/characters", {
        params: {
          ts: timestamp,
          apikey: process.env.REACT_APP_PUBLIC_KEY,
          hash,
          ...action.payload,
        },
      })
    );

    yield put(fullfiledMarvelsCharacters(characters.data));
  } catch (e) {
    // const error = e as AxiosError<BaseRequestError>;

    yield put(
      rejectedMarvelsCharacters({ message: "Sorry, something wrong..." })
    );
  }
}

export function* watchFetchMarvelsCharacters() {
  yield takeEvery(getMarvelsCharacters.type, workerMarvelsCharacters);
}
