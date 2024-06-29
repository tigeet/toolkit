import { countSlice } from "@pages/main/model/countSlice/slice";
import { mainSlice } from "@pages/main/model/mainSlice/slice";
import { repositorySlice } from "@pages/repository/model/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [mainSlice.name]: mainSlice.reducer,
  [countSlice.name]: countSlice.reducer,
  [repositorySlice.name]: repositorySlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
