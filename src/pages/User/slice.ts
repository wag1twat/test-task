import { createSlice } from "@reduxjs/toolkit";
import { fullfiledUser, getUser, rejectedUser } from "hooks/useUser";
import { User } from "hooks/useUsers";
import { BaseRequestError } from "types";

interface UsersState extends Partial<User> {
  isLoading: boolean;
  error: BaseRequestError | null;
}

const initialState: UsersState = { isLoading: false, error: null };

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    clearUserSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.type, (_) => ({
      isLoading: true,
      error: null,
    }));

    builder.addCase(
      fullfiledUser.type,
      (state, { payload }: ReturnType<typeof fullfiledUser>) => ({
        ...state,
        ...payload.data,
        isLoading: false,
        error: null,
      })
    );

    builder.addCase(
      rejectedUser.type,
      (state, { payload }: ReturnType<typeof rejectedUser>) => ({
        ...state,
        isLoading: false,
        error: payload,
      })
    );
  },
});

export const { clearUserSlice } = userSlice.actions;
