import { client } from "@app/apollo";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { Repository } from "./types";
import { RootState } from "@app/store";
import { GET_CURSOR_AT_POSITION, GET_REPOSITORIES } from "@pages/main/api";
import { PAGE_SIZE } from "@pages/main/const";
import { createQuery } from "../actions";
import { selectPage, selectSearch } from "./selector";

async function fetchCursorByPage(page: number, query: string) {
  const { data } = await client.query({
    query: GET_CURSOR_AT_POSITION,
    variables: {
      query,
      position: (page - 1) * PAGE_SIZE,
    },
  });

  const cursor = data.search.pageInfo.endCursor;
  return cursor;
}

async function fetchPageByCursor(cursor: string | null, query: string) {
  const { data } = await client.query({
    query: GET_REPOSITORIES,
    variables: {
      query,
      after: cursor,
      size: PAGE_SIZE,
    },
  });

  const { repos } = data.search;

  return repos.map((entry: { repo: object }) => ({
    ...entry.repo,
  }));
}

export const fetchPageThunk = createAsyncThunk<
  Repository[],
  undefined,
  { state: RootState }
>("main/fetchNextPage", async (_, thunkAPI) => {
  const state = thunkAPI.getState();

  const query = await createQuery(selectSearch(state));
  const cursor = await fetchCursorByPage(selectPage(state), query);
  return await fetchPageByCursor(cursor, query);
});
