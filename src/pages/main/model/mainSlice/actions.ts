import { client } from "@app/apollo";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { Repository } from "./types";
import { RootState } from "@app/store";
import { GET_CURSOR_WITH_OFFSET, GET_REPOSITORIES } from "@pages/main/api";
import { PAGE_SIZE } from "@pages/main/const";
import { createQuery } from "../actions";
import { selectSearch } from "./selector";

async function fetchCursorWithOffset(query: string | null, state: RootState) {
  if (!state.main.previousPage) return null;

  const offset = state.main.page - state.main.previousPage;
  if (offset === 0) return state.main.startCursor;
  if (offset === 1) return state.main.endCursor;
  if (state.main.page === 1) return null;
  const { data: cursorData } = await client.query({
    query: GET_CURSOR_WITH_OFFSET,
    variables: {
      query,
      // last: offset < 0 ? 1 : null,
      before: offset < 0 ? state.main.startCursor : null,
      after: offset > 0 ? state.main.endCursor : null,
      first: offset > 0 ? (offset - 1) * PAGE_SIZE : null,
      last: offset < 0 ? -offset * PAGE_SIZE + 1 : null,
    },
  });

  return offset < 0
    ? cursorData.search.pageInfo.startCursor
    : cursorData.search.pageInfo.endCursor;
}

export const fetchPageThunk = createAsyncThunk<
  {
    repositories: Repository[];
    endCursor: string;
    startCursor: string;
  },
  undefined,
  { state: RootState }
>("main/fetchNextPage", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  
  const query = await createQuery(selectSearch(state));
  const cursor = await fetchCursorWithOffset(query, state);

  const { data } = await client.query({
    query: GET_REPOSITORIES,
    variables: {
      query,
      after: cursor,
      size: PAGE_SIZE,
    },
  });

  const {
    repos,
    pageInfo: { endCursor, startCursor },
  } = data.search;
  console.log(startCursor, endCursor);
  return {
    repositories: repos.map((entry: { repo: object }) => ({
      ...entry.repo,
    })),
    endCursor: endCursor as string,
    startCursor: startCursor as string,
  };
});
