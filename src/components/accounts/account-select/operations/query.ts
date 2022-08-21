import { gql } from '@apollo/client';

export const ACCOUNT_SELECT_GET_ACCOUNTS = gql`
  query AccountSelect_GetAccounts(
    $getAccountsInput: GetAccountsInput!
    $getUsersInput: GetUsersInput!
  ) {
    getAccounts(getAccountsInput: $getAccountsInput) {
      data {
        _id
        email
        users(getUsersInput: $getUsersInput) {
          data {
            _id
            first_name
            last_name
            email
            memberships {
              _id
              default
              account {
                _id
              }
            }
          }
        }
      }
    }
  }
`;
