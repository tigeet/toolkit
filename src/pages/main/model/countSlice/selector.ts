import { RootState } from "@app/store";
import { createSelector } from "reselect";

export const selectCount = (state: RootState) => state.count.total;

export const selectCountLoading = (state: RootState) => state.count.loading;
