import { client } from "@app/apollo";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { createQuery } from "../utils";
import { GET_REPOSITORIES_COUNT } from "@pages/main/api";

export const fetchRepositoryCount = createAsyncThunk<
  number,
  void,
  { state: RootState }
>("main/fetchFirstPage", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const query = await createQuery(state.main.search);
  const { data } = await client.query({
    query: GET_REPOSITORIES_COUNT,
    variables: {
      query,
    },
  });
  return data.search.repositoryCount;
});
