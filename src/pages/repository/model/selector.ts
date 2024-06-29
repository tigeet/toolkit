import { RootState } from "@app/store";
import { createSelector } from "reselect";

export const selectLoading = (state: RootState) => state.repository.loading;
const selectRepositoryState = (state: RootState) => state.repository;
export const selectRepositoryInfo = createSelector(
  selectRepositoryState,
  (repositoryState) => repositoryState.repository
);
