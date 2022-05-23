import { gql } from '@apollo/client';

export const USERS_PAGE_GET_USERS = gql`
  query UsersPage_GetUsers($getUsersInput: GetUsersInput!) {
    getUsers(getUsersInput: $getUsersInput) {
      stats {
        total
        remaining
        cursor
      }
      data {
        _id
        first_name
        last_name
        email
        phone
        image {
          path
          _id
        }
      }
    }
  }
`;
