import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RepositoryInfo, State } from "./type";
import { client } from "@app/apollo";
import { GET_REPOSITORY_INFO } from "../api";
import { LANGAUGES_LIMIT } from "../const";

const initialState: State = {
  loading: false,
  name: "",
  owner: "",
  repository: {
    stars: 0,
    updatedAt: "",
    ownerUrl: "",
    avatarUrl: undefined,
    languages: [],
    totalLanguages: 0,
    description: "",
  },
};

export const fetchRepositoryThunk = createAsyncThunk<
  RepositoryInfo,
  { owner: string; name: string },
  object
>("repository/fetchRepository", async ({ owner, name }) => {
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
    avatarUrl: data.repository.owner.avatarUrl,
    ownerUrl: data.repository.owner.url,
    description: data.repository.description,
    languages: data.repository.languages.nodes.map(
      (node: { name: string }) => node.name
    ),
    totalLanguages: data.repository.languages.totalCount,
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
    reset: (state) => {
      Object.assign(state, initialState);
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

export const { setName, setOwner, reset } = repositorySlice.actions;
