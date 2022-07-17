import { gql } from 'apollo-server-express';

export const MEDIAS_PAGE_GET_MEDIA = gql`
  query MediasPage_GetMedia($getMediaInput: GetMediaInput!) {
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
