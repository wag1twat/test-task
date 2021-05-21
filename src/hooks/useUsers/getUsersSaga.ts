import { createAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { BaseRequestError } from "types";
import { UsersResponse } from "./types";

export const getUsers = createAction("pending/users");

export const fullfiledUsers = createAction(
  "fullfiled/users",
  (payload: UsersResponse) => ({ payload })
);

export const rejectedUsers = createAction(
  "rejected/users",
  (payload: BaseRequestError | null) => ({ payload })
);

function* workerUsers(_: ReturnType<typeof getUsers>) {
  try {
    const users: AxiosResponse<UsersResponse> = yield call(() =>
      axios.get("https://reqres.in/api/users")
    );

    yield put(fullfiledUsers(users.data));
  } catch (e) {
    // const error = e as AxiosError<BaseRequestError>;

    yield put(rejectedUsers({ message: "Sorry, something wrong..." }));
  }
}

export function* watchFetchUsers() {
  yield takeEvery(getUsers.type, workerUsers);
}
