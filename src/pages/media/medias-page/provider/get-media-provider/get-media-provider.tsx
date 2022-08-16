import { FC, ReactNode } from 'react';
import { Providers } from '@the-devoyage/orions-arrow';
import { MEDIA_LIST_GET_MEDIA } from '../../operations';

interface GetMediaProviderProps {
  children: ReactNode;
}
export const GetMediaProvider: FC<GetMediaProviderProps> = ({ children }) => {
  return (
    <Providers.Media.Queries.GetMediaProvider
      query={{
        documentNode: MEDIA_LIST_GET_MEDIA,
        variables: {
          getMediaInput: {
            query: {},
            config: { pagination: { limit: 16, reverse: true } },
          },
        },
      }}
    >
      {children}
    </Providers.Media.Queries.GetMediaProvider>
  );
};
