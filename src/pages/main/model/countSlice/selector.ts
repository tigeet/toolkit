import { RootState } from "@app/store";

export const selectCount = (state: RootState) => state.count.total;

export const selectCountLoading = (state: RootState) => state.count.loading;
