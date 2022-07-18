import { Providers } from 'src/apollo';
import { MediaList } from 'src/components/media';
import { useMediaList_GetMediaQuery } from 'src/types/generated';

export const MediasPage = () => {
  return (
    <Providers.Media.Mutations.CreateMediaProvider
      createMediaInput={{ payload: [] }}
    >
      <Providers.Media.Queries.GetMediaProvider
        queryHook={useMediaList_GetMediaQuery}
        getMediaInput={{
          query: {},
          config: { pagination: { limit: 16, reverse: true } },
        }}
      >
        <Providers.Media.Mutations.DeleteMediaProvider
          deleteMediaInput={{ query: {} }}
        >
          <MediaList />
        </Providers.Media.Mutations.DeleteMediaProvider>
      </Providers.Media.Queries.GetMediaProvider>
    </Providers.Media.Mutations.CreateMediaProvider>
  );
};
