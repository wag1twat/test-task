import { createSlice } from "@reduxjs/toolkit";
import {
  fullfiledUsers,
  getUsers,
  rejectedUsers,
  UsersResponse,
} from "hooks/useUsers";
import { BaseRequestError } from "types";

interface UsersState extends Partial<UsersResponse> {
  isLoading: boolean;
  error: BaseRequestError | null;
}

const initialState: UsersState = { isLoading: false, error: null };

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    clearUsersSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.type, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }));

    builder.addCase(
      fullfiledUsers.type,
      (state, { payload }: ReturnType<typeof fullfiledUsers>) => ({
        ...state,
        ...payload,
        isLoading: false,
        error: null,
      })
    );

    builder.addCase(
      rejectedUsers.type,
      (state, { payload }: ReturnType<typeof rejectedUsers>) => ({
        ...state,
        isLoading: false,
        error: payload,
      })
    );
  },
});

export const { clearUsersSlice } = usersSlice.actions;
