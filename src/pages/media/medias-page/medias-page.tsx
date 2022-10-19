import { MediasPageRootProvider } from './provider';
import { MediasPageBody } from './views';
import { MediasPageModals } from './views/modals';

export const MediasPage = () => (
  <MediasPageRootProvider>
    <MediasPageBody />
    <MediasPageModals />
  </MediasPageRootProvider>
);
