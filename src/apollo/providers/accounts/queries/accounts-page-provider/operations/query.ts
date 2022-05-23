import { gql } from '@apollo/client';

export const ACCOUNTS_PAGE_GET_ACCOUNTS = gql`
  query AccountsPage_GetAccounts(
    $getAccountsInput: GetAccountsInput!
    $getUsersInput: GetUsersInput!
  ) {
    getAccounts(getAccountsInput: $getAccountsInput) {
      stats {
        total
        remaining
        cursor
      }
      data {
        _id
        email
        createdAt
        users(getUsersInput: $getUsersInput) {
          stats {
            total
          }
        }
      }
    }
  }
`;
