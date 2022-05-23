import { gql } from '@apollo/client';

export const USER_SELECT_GET_USERS = gql`
  query UserSelect_GetUsers($getUsersInput: GetUsersInput!) {
    getUsers(getUsersInput: $getUsersInput) {
      data {
        _id
        email
        first_name
        last_name
      }
    }
  }
`;
