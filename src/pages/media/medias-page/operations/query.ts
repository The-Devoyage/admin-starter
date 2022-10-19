import { gql } from '@apollo/client';

export const MEDIA_LIST_GET_MEDIA = gql`
  query MediaList_GetMedia($getMediaInput: GetMediaInput!) {
    getMedia(getMediaInput: $getMediaInput) {
      data {
        _id
        src
        title
        mimetype
        createdAt
        created_by {
          first_name
          last_name
          email
          _id
          createdAt
          updatedAt
        }
      }
      stats {
        total
        cursor
        remaining
      }
    }
  }
`;
