import { gql } from '@apollo/client';

export const USER_PAGE_UPDATE_USER = gql`
  mutation UserPage_UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
      email
      first_name
      last_name
      about
      address {
        city
        lineTwo
        lineOne
        state
        zip
      }
      phone
      image {
        _id
        path
        title
      }
    }
  }
`;
