import { RootState } from "@app/store";

export const selectPage = (state: RootState) => state.main.page;
export const selectPreviousPage = (state: RootState) => state.main.previousPage;
export const selectRepositoriesLoading = (state: RootState) =>
  state.main.loading;
export const selectRepositories = (state: RootState) => state.main.repositories;
export const selectSearch = (state: RootState) => state.main.search;
