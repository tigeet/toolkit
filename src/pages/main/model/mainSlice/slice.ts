import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchPageThunk } from "./actions";
import { Repository, State } from "./types";

const initialState: State = {
  search: "",
  page: 1,
  previousPage: null,
  endCursor: null,
  startCursor: null,
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
      state.previousPage = null;
      state.endCursor = null;
      state.startCursor = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.previousPage = state.page;
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPageThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPageThunk.fulfilled, (state, action) => {
        state.repositories = action.payload.repositories;
        state.endCursor = action.payload.endCursor;
        state.startCursor = action.payload.startCursor;
        state.loading = false;
      });
  },
});

export const { setSearch, setPage } = mainSlice.actions;
