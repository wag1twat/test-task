import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { charactersSlice } from "pages/Characters/slice";
import { rootSaga } from "./rootSaga";
import { usersSlice } from "pages/Users/slice";
import { userSlice } from "pages/User/slice";
import { characterSlice } from "pages/Character";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  characters: charactersSlice.reducer,
  character: characterSlice.reducer,
  users: usersSlice.reducer,
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type RootState = ReturnType<typeof rootReducer>;
