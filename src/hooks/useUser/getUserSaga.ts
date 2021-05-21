import { createAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { UserResponse } from "hooks/useUser";
import { call, put, takeEvery } from "redux-saga/effects";
import { BaseRequestError } from "types";

export const getUser = createAction("pending/user", (payload: string) => ({
  payload,
}));

export const fullfiledUser = createAction(
  "fullfiled/user",
  (payload: UserResponse) => ({ payload })
);

export const rejectedUser = createAction(
  "rejected/user",
  (payload: BaseRequestError | null) => ({ payload })
);

function* workerUser({ payload }: ReturnType<typeof getUser>) {
  try {
    const user: AxiosResponse<UserResponse> = yield call(() =>
      axios.get(`https://reqres.in/api/users/${payload}`)
    );

    yield put(fullfiledUser(user.data));
  } catch (e) {
    // const error = e as AxiosError<BaseRequestError>;

    yield put(rejectedUser({ message: "Sorry, something wrong..." }));
  }
}

export function* watchFetchUser() {
  yield takeEvery(getUser.type, workerUser);
}
