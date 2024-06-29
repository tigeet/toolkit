import { RootState } from "@app/store";
import { createSelector } from "reselect";

const selectRepositoryState = (state: RootState) => state.repository;

const selectRepositoryInfo = createSelector(
  selectRepositoryState,
  (repositoryState) => repositoryState.repository
);

export { selectRepositoryState, selectRepositoryInfo };
