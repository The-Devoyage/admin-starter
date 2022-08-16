import { Hooks } from '@the-devoyage/orions-arrow';
import { useContext } from 'react';
import { MediaList } from 'src/components/media';
import { MediaList_GetMediaQuery } from 'src/types/generated';
import { MediasPageContext } from '../provider/medias-page-provider';

export const MediasPageBody = () => {
  const { setMediaManagerModalVisible } = useContext(MediasPageContext);
  const { media, loading, handleSearch, handleFetchMore, stats } =
    Hooks.Media.useGetMedia<MediaList_GetMediaQuery['getMedia']['data'][0]>();

  return (
    <MediaList
      loading={loading}
      handleSearch={handleSearch}
      media={media}
      stats={stats}
      handleFetchMore={handleFetchMore}
      setMediaManagerVisible={setMediaManagerModalVisible}
    />
  );
};
