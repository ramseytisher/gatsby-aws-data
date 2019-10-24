/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAccount = `query GetAccount($id: ID!) {
  getAccount(id: $id) {
    id
    first
    last
  }
}
`;
export const listAccounts = `query ListAccounts(
  $filter: ModelAccountFilterInput
  $limit: Int
  $nextToken: String
) {
  listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      first
      last
    }
    nextToken
  }
}
`;
