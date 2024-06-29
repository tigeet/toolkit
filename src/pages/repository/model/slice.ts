import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RepositoryInfo, State } from "./type";
import { RootState } from "@app/store";
import { client } from "@app/apollo";
import { GET_REPOSITORY_INFO } from "../api";
import { LANGAUGES_LIMIT } from "../const";

const initialState: State = {
  loading: false,
};

export const fetchRepositoryThunk = createAsyncThunk<
  RepositoryInfo,
  undefined,
  { state: RootState }
>("repository/fetchRepository", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const owner = state.repository.owner;
  const name = state.repository.name;

  const { data } = await client.query({
    query: GET_REPOSITORY_INFO,
    variables: {
      languagesLimit: LANGAUGES_LIMIT,
      owner,
      name,
    },
  });

  const result: RepositoryInfo = {
    stars: data.repository.stars,
    updatedAt:
      data.repository.defaultBranchRef.target.history.edges[0].node
        .committedDate,
    avatar: data.repository.owner.avatarUrl,
    description: data.repository.description,
    languages: data.repository.languages.nodes.map(
      (node: { name: string }) => node.name
    ),
    hasExtraLanguages: data.repository.languages.totalCount > LANGAUGES_LIMIT,
  };
  return result;
});
export const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    setOwner: (state, action) => {
      state.owner = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositoryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRepositoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.repository = action.payload;
      });
  },
});

export const { setName, setOwner } = repositorySlice.actions;
