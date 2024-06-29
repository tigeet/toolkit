import { gql } from "@apollo/client";

export const GET_REPOSITORY_INFO = gql`
  query GetRepositoryInfo(
    $owner: String!
    $name: String!
    $languagesLimit: Int!
  ) {
    repository(owner: $owner, name: $name) {
      description
      stars: stargazerCount
      owner {
        login
        url
        avatarUrl
      }

      languages(
        first: $languagesLimit
        orderBy: { field: SIZE, direction: DESC }
      ) {
        totalCount
        nodes {
          name
        }
      }

      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 1) {
              edges {
                node {
                  ... on Commit {
                    committedDate
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
