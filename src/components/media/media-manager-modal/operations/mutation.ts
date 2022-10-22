import { gql } from '@apollo/client';

export const MEDIAS_PAGE_CREATE_MEDIA = gql`
  mutation MediasPageCreateMedia($createMediaInput: CreateMediaInput!) {
    createMedia(createMediaInput: $createMediaInput) {
      media {
        _id
        path
        mimetype
        title
        src
      }
    }
  }
`;

export const MEDIAS_PAGE_DELETE_MEDIA = gql`
  mutation MediasPage_DeleteMedia($deleteMediaInput: DeleteMediaInput!) {
    deleteMedia(deleteMediaInput: $deleteMediaInput) {
      deletedCount
    }
  }
`;
