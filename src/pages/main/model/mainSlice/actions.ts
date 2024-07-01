import { client } from "@app/apollo";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { TRepository } from "./types";
import { RootState } from "@app/store";
import { GET_CURSOR_WITH_OFFSET, GET_REPOSITORIES } from "@pages/main/api";
import { PAGE_SIZE } from "@pages/main/const";
import { createQuery } from "../utils";

async function fetchCursorWithOffset(query: string | null, state: RootState) {
  if (!state.main.previousPage) return null;

  const offset = state.main.page - state.main.previousPage;
  if (offset === 0) return state.main.startCursor;
  if (offset === 1) return state.main.endCursor;
  if (state.main.page === 1) return null;

  if (offset < 0) {
    const { data: cursorData } = await client.query({
      query: GET_CURSOR_WITH_OFFSET,
      variables: {
        query,
        before: state.main.startCursor,
        last: -offset * PAGE_SIZE + 1,
      },
    });

    return cursorData.search.pageInfo.startCursor;
  }

  const { data: cursorData } = await client.query({
    query: GET_CURSOR_WITH_OFFSET,
    variables: {
      query,
      after: state.main.endCursor,
      first: (offset - 1) * PAGE_SIZE,
    },
  });

  return cursorData.search.pageInfo.endCursor;
}

export const fetchPageThunk = createAsyncThunk<
  {
    repositories: TRepository[];
    endCursor: string;
    startCursor: string;
  },
  undefined,
  { state: RootState }
>("main/fetchNextPage", async (_, thunkAPI) => {
  const state = thunkAPI.getState();

  const query = await createQuery(state.main.search);
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

  return {
    repositories: repos.map(
      (entry: {
        repo: {
          id: string;
          name: string;
          owner: { login: string };
          start: number;
          url: string;
          defaultBranchRef?: {
            target: {
              history: { edges: { node: { committedDate: string } }[] };
            };
          };
        };
      }) => ({
        ...entry.repo,
        defaultBranchRef: {},
        owner: entry.repo.owner.login,
        updatedAt:
          entry.repo.defaultBranchRef?.target.history.edges[0].node
            .committedDate,
      })
    ),
    endCursor: endCursor as string,
    startCursor: startCursor as string,
  };
});
