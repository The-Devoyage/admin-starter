import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { CreateMediaProvider } from './create-media-provider';
import { DeleteMediaProvider } from './delete-media-provider/delete-media-provider';
import {
  GetMediaProvider,
  MediaManagerMediaProvider,
} from './get-media-provider';
import { MediasPageProvider } from './medias-page-provider';

interface MediasPageRootProviderProps {
  children: ReactNode;
}

export const MediasPageRootProvider: FC<MediasPageRootProviderProps> = ({
  children,
}) => (
  <Utils.Compose
    components={[
      MediasPageProvider,
      GetMediaProvider,
      CreateMediaProvider,
      DeleteMediaProvider,
      MediaManagerMediaProvider,
    ]}
  >
    {children}
  </Utils.Compose>
);
