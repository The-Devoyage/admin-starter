import { gql } from 'apollo-server-express';

export const CREATE_MEDIA = gql`
  mutation CreateMedia($createMediaInput: CreateMediaInput!) {
    createMedia(createMediaInput: $createMediaInput) {
      media {
        _id
        path
        mimetype
        title
      }
    }
  }
`;
