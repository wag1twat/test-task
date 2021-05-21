import { createAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { call, takeEvery } from "redux-saga/effects";
import { CharacterQueries } from ".";
import { createHash } from "utils";

export const getMarvelsCharacters = createAction(
  "get/marvels/characters",
  (payload: Partial<CharacterQueries> = {}) => ({ payload })
);

function* workerMarvelsCharacters(
  action: ReturnType<typeof getMarvelsCharacters>
): any {
  console.log("workerMarvelsCharacters", action);

  const timestamp = new Date().getTime();

  const hash = createHash(timestamp);

  const characters: AxiosResponse = yield call(() =>
    axios.get("https://gateway.marvel.com/v1/public/characters", {
      params: {
        ts: timestamp,
        apikey: process.env.REACT_APP_PUBLIC_KEY,
        hash,
        ...action.payload,
      },
    })
  );

  console.log(characters);
}

export function* watchFetchMarvelsCharacters() {
  yield takeEvery(getMarvelsCharacters.type, workerMarvelsCharacters);
}
