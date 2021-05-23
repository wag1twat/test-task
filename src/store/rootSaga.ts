import { all, fork } from "@redux-saga/core/effects";
import { watchFetchMarvelsCharacter } from "hooks/useCharacter";
import { watchFetchMarvelsCharacters } from "hooks/useCharacters/getCharactersSaga";
import { watchFetchUser } from "hooks/useUser";
import { watchFetchUsers } from "hooks/useUsers";

export function* rootSaga() {
  yield all([
    fork(watchFetchMarvelsCharacters),
    fork(watchFetchMarvelsCharacter),
    fork(watchFetchUsers),
    fork(watchFetchUser),
  ]);
}
