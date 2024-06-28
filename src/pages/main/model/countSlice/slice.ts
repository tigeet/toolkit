import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchRepositoryCount } from "./actions";
import { State } from "./types";

const initialState: State = {
  total: 0,
  loading: true,
};

export const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositoryCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchRepositoryCount.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.total = action.payload;
          state.loading = false;
        }
      );
  },
});
