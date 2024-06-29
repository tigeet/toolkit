import { gql } from "@apollo/client";

export const GET_CURSOR_WITH_OFFSET = gql`
  query GetCursorWithOffset(
    $after: String
    $first: Int
    $before: String
    $last: Int
    $query: String!
  ) {
    search(
      type: REPOSITORY
      query: $query
      first: $first
      after: $after
      before: $before
      last: $last
    ) {
      pageInfo {
        startCursor
        endCursor
      }
    }
  }
`;
export const GET_CURRENT_USER = gql`
  query {
    viewer {
      login
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
      pageInfo {
        startCursor
        endCursor
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
