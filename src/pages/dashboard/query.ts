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
