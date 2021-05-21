import { all, fork } from "@redux-saga/core/effects";
import { watchFetchMarvelsCharacters } from "hooks/useCharacters/getCharactersSaga";
import { watchFetchUser } from "hooks/useUser";
import { watchFetchUsers } from "hooks/useUsers";

export function* rootSaga() {
  yield all([
    fork(watchFetchMarvelsCharacters),
    fork(watchFetchUsers),
    fork(watchFetchUser),
  ]);
}
