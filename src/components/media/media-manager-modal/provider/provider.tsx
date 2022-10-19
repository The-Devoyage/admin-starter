import { FC, ReactNode } from 'react';
import { Utils } from 'src/common';
import { CreateMediaProvider } from './create-media-provider';
import { DeleteMediaProvider } from './delete-media-provider';
import { GetMediaProvider } from './get-media-provider';

interface MediaManagerModalRootProvider {
  children: ReactNode;
}

export const MediaManagerModalRootProvider: FC<
  MediaManagerModalRootProvider
> = ({ children }) => (
  <Utils.Compose
    components={[GetMediaProvider, CreateMediaProvider, DeleteMediaProvider]}
  >
    {children}
  </Utils.Compose>
);
