import { gql } from '@apollo/client';

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

export const DASHBOARD_GET_ME = gql`
  query App_GetMe {
    me {
      _id
      first_name
      last_name
      email
      image {
        path
      }
    }
  }
`;
