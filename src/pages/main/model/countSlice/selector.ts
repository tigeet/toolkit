import { RootState } from "@app/store";

export const selectTotal = (state: RootState) => ({
  loading: state.count.loading,
  total: state.count.total,
});
