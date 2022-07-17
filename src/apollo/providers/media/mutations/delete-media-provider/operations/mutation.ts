import { gql } from 'apollo-server-express';

export const DELETE_MEDIA = gql`
  mutation DeleteMedia($deleteMediaInput: DeleteMediaInput!) {
    deleteMedia(deleteMediaInput: $deleteMediaInput) {
      deletedCount
    }
  }
`;
