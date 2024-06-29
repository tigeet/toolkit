import { RootState } from "@app/store";
import { createSelector } from "reselect";

const selectLoading = (state: RootState) => state.count.loading;
const selectTotalValue = (state: RootState) => state.count.total;
export const selectTotal = createSelector(
  [selectLoading, selectTotalValue],
  (loading, total) => ({
    loading,
    total,
  })
);
