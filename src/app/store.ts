import { countSlice } from "@pages/main/model/countSlice/slice";
import { mainSlice } from "@pages/main/model/mainSlice/slice";
import { repositorySlice } from "@pages/repository/model/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  [mainSlice.name]: mainSlice.reducer,
  [countSlice.name]: countSlice.reducer,
  [repositorySlice.name]: repositorySlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [repositorySlice.name],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
