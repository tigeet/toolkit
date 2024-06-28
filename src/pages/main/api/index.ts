import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query {
    viewer {
      login
    }
  }
`;

export const GET_CURSOR_AT_POSITION = gql`
  query GetCursorAtPosition($query: String!, $position: Int) {
    search(type: REPOSITORY, query: $query, first: $position) {
      pageInfo {
        endCursor
      }
    }
  }
`;
export const GET_REPOSITORIES = gql`
  query GetRepositories($after: String, $size: Int, $query: String!) {
    search(type: REPOSITORY, query: $query, first: $size, after: $after) {
      repos: edges {
        repo: node {
          ... on Repository {
            id
            url
            owner {
              login
            }
            name
            stars: stargazerCount
            updatedAt
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORIES_COUNT = gql`
  query GetRepositories($after: String, $size: Int, $query: String!) {
    search(type: REPOSITORY, query: $query, first: $size, after: $after) {
      repositoryCount
    }
  }
`;
