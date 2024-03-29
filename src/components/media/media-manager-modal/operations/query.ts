import { gql } from '@apollo/client';

export const MEDIA_MANAGER_GET_MEDIA = gql`
  query MediaManager_GetMedia($getMediaInput: GetMediaInput!) {
    getMedia(getMediaInput: $getMediaInput) {
      data {
        _id
        title
        mimetype
        src
      }
      stats {
        total
        cursor
        remaining
      }
    }
  }
`;
