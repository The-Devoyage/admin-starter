import { Providers } from 'src/apollo';
import { MediaList } from 'src/components/media';

export const MediasPage = () => {
  return (
    <Providers.Media.Mutations.CreateMediaProvider
      createMediaInput={{ payload: [] }}
    >
      <Providers.Media.Queries.MediasPageProvider
        getMediaInput={{
          query: {},
          config: { pagination: { limit: 16, reverse: true } },
        }}
      >
        <Providers.Media.Mutations.DeleteMediaProvider
          deleteMediaInput={{ query: {} }}
        >
          <Providers.Media.Queries.MediaManagerProvider
            getMediaInput={{
              query: {},
              config: { pagination: { limit: 16, reverse: true } },
              transform: { resize: { width: 300, height: 200 } },
            }}
          >
            <MediaList />
          </Providers.Media.Queries.MediaManagerProvider>
        </Providers.Media.Mutations.DeleteMediaProvider>
      </Providers.Media.Queries.MediasPageProvider>
    </Providers.Media.Mutations.CreateMediaProvider>
  );
};
