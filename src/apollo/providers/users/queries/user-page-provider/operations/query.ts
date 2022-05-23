import { gql } from '@apollo/client';

export const USER_PAGE_GET_USERS = gql`
  query UserPage_GetUsers(
    $getUsersInput: GetUsersInput!
    $membershipsAccountUsersInput: GetUsersInput!
  ) {
    getUsers(getUsersInput: $getUsersInput) {
      data {
        _id
        first_name
        last_name
        email
        phone
        about
        updatedAt
        createdAt
        address {
          lineOne
          lineTwo
          zip
          city
          state
        }
        image {
          path
          _id
        }
        memberships {
          _id
          role
          status
          createdAt
          updatedAt
          default
          local {
            first_name
            last_name
            phone
            about
            image {
              _id
              path
            }
            address {
              lineOne
              lineTwo
              city
              state
              zip
            }
          }
          account {
            _id
            email
            users(getUsersInput: $membershipsAccountUsersInput) {
              data {
                _id
                first_name
                last_name
                email
              }
            }
          }
        }
      }
    }
  }
`;
