import { gql } from 'apollo-server-express';

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

export const MEDIA_COUNT_WIDGET_GET_MEDIA = gql`
  query MediaCountWidget_GetMedia($getMediaInput: GetMediaInput!) {
    getMedia(getMediaInput: $getMediaInput) {
      stats {
        total
        history {
          _id {
            MONTH
          }
          total
        }
      }
    }
  }
`;
