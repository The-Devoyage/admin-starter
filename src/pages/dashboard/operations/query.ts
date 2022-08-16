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

export const USER_COUNT_WIDGET_GET_USERS = gql`
  query UserCountWidget_GetUsers($getUsersInput: GetUsersInput!) {
    getUsers(getUsersInput: $getUsersInput) {
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

export const MEDIA_COUNT_WIDGET_GET_MEDIA = gql`
  query MediaCountWidget_GetMedia($getMediaInput: GetMediaInput!) {
    getMedia(getMediaInput: $getMediaInput) {
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
