import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { GetMediaProvider } from './get-media-provider';
import { MediasPageProvider } from './medias-page-provider';

interface MediasPageRootProviderProps {
  children: ReactNode;
}

export const MediasPageRootProvider: FC<MediasPageRootProviderProps> = ({
  children,
}) => (
  <Utils.Compose components={[MediasPageProvider, GetMediaProvider]}>
    {children}
  </Utils.Compose>
);
