import { RootState } from "@app/store";

export const selectLoading = (state: RootState) => state.repository.loading;
export const selectError = (state: RootState) => state.repository.error;

export const selectRepositoryInfo = (state: RootState) =>
  state.repository.repository;
