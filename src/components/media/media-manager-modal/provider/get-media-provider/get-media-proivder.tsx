import { FC, ReactNode } from 'react';
import { Providers } from '@the-devoyage/orions-arrow';
import { MEDIA_MANAGER_GET_MEDIA } from '../../operations';

interface GetMediaProviderProps {
  children: ReactNode;
}

export const GetMediaProvider: FC<GetMediaProviderProps> = ({ children }) => (
  <Providers.Media.Queries.GetMediaProvider
    query={{
      documentNode: MEDIA_MANAGER_GET_MEDIA,
      variables: {
        getMediaInput: {
          query: {},
          config: { pagination: { limit: 16, reverse: true } },
          transform: { resize: { width: 300, height: 200 } },
        },
      },
    }}
  >
    {children}
  </Providers.Media.Queries.GetMediaProvider>
);
