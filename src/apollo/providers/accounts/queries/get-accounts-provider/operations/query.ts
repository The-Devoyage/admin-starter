import { gql } from '@apollo/client';

export const ACCOUNTS_LIST_GET_ACCOUNTS = gql`
  query AccountsList_GetAccounts(
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

export const ACCOUNT_COUNT_WIDGET_GET_ACCOUNTS = gql`
  query AccountCountWidget_GetAccounts($getAccountsInput: GetAccountsInput!) {
    getAccounts(getAccountsInput: $getAccountsInput) {
      stats {
        total
        history {
          _id {
            MONTH
          }
          total
        }
      }
    }
  }
`;

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
