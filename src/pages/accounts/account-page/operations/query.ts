import { gql } from '@apollo/client';

export const ACCOUNT_PAGE_GET_ACCOUNTS = gql`
  query AccountPage_GetAccounts(
    $getAccountsInput: GetAccountsInput!
    $getUsersInput: GetUsersInput!
  ) {
    getAccounts(getAccountsInput: $getAccountsInput) {
      data {
        _id
        email
        createdAt
        updatedAt
        activation {
          code
          limit
          verified
        }
        users(getUsersInput: $getUsersInput) {
          stats {
            total
          }
          data {
            _id
            email
            first_name
            last_name
            updatedAt
            about
            image {
              path
              _id
            }
            memberships {
              _id
              default
              status
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
