import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchPageThunk } from "./actions";
import { Repository, State } from "./types";

const initialState: State = {
  search: "",
  page: 1,
  loading: false,
  repositories: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.page = 1;
      state.repositories = [];
      state.search = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPageThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPageThunk.fulfilled,
        (state, action: PayloadAction<Repository[]>) => {
          state.repositories = action.payload;
          state.loading = false;
        }
      );
  },
});

export const { setSearch, setPage } = mainSlice.actions;
