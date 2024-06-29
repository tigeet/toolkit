import { RootState } from "@app/store";
import { createSelector } from "reselect";

export const selectSearch = (state: RootState) => state.main.search;
export const selectPage = (state: RootState) => state.main.page;
const selectLoading = (state: RootState) => state.main.loading;
const selectRepositoriesList = (state: RootState) => state.main.repositories;

export const selectRepositories = createSelector(
  [selectLoading, selectRepositoriesList],
  (loading, repositories) => ({ loading, repositories })
);
