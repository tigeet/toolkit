import { RootState } from "@app/store";
import { createSelector } from "reselect";
const selectState = (state: RootState) => state.main;
export const selectRepositories = createSelector(
  [selectState],
  (state) => state
);
