import { createAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { createHash } from "utils";
import { BaseRequestError } from "types";
import { Character, CharactersResponse } from "hooks/useCharacters";

export const getMarvelsCharacter = createAction(
  "get/marvels/character",
  (payload: number) => ({ payload })
);

export const fullfiledMarvelsCharacter = createAction(
  "fullfiled/marvels/character",
  (payload: Character) => ({ payload })
);

export const rejectedMarvelsCharacter = createAction(
  "rejected/marvels/character",
  (payload: BaseRequestError | null) => ({ payload })
);

function* workerMarvelsCharacter({
  payload,
}: ReturnType<typeof getMarvelsCharacter>) {
  const timestamp = new Date().getTime();

  const hash = createHash(timestamp);

  try {
    const character: AxiosResponse<CharactersResponse> = yield call(() =>
      axios.get(`https://gateway.marvel.com/v1/public/characters/${payload}`, {
        params: {
          ts: timestamp,
          apikey: process.env.REACT_APP_PUBLIC_KEY,
          hash,
        },
      })
    );

    yield put(fullfiledMarvelsCharacter(character.data.data.results[0]));
  } catch (e) {
    // const error = e as AxiosError<BaseRequestError>;

    yield put(
      rejectedMarvelsCharacter({ message: "Sorry, something wrong..." })
    );
  }
}

export function* watchFetchMarvelsCharacter() {
  yield takeEvery(getMarvelsCharacter.type, workerMarvelsCharacter);
}
