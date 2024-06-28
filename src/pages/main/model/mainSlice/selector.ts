import { RootState } from "@app/store";

export const selectRepositories = (state: RootState) => ({
  repositories: state.main.repositories,
  loading: state.main.loading,
});

export const selectSearch = (state: RootState) => state.main.search;
export const selectPage = (state: RootState) => state.main.page;
