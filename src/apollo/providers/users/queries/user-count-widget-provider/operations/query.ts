import { gql } from '@apollo/client';

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
