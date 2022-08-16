import { Hooks } from '@the-devoyage/orions-arrow';
import { useContext } from 'react';
import { MediaManagerModal } from 'src/components/media/media-manager-modal/media-manager-modal';
import { MediaList_GetMediaQuery } from 'src/types/generated';
import { MediasPageContext } from '../provider/medias-page-provider';

export const MediasPageModals = () => {
  const { mediaManagerModalVisible, setMediaManagerModalVisible } =
    useContext(MediasPageContext);

  const {
    media,
    stats,
    handleFetchMore,
    handleSearch,
    searchValue,
    loading: fetchingMedia,
  } = Hooks.Media.useGetMedia<MediaList_GetMediaQuery['getMedia']['data'][0]>();

  const { form: uploadForm } = Hooks.Media.useCreateMedia();

  const { form: deleteForm } = Hooks.Media.useDeleteMedia();

  const loading = fetchingMedia;

  return (
    <MediaManagerModal
      visible={mediaManagerModalVisible}
      setVisible={setMediaManagerModalVisible}
      handleFetchMore={handleFetchMore}
      handleSearch={handleSearch}
      stats={stats}
      media={media}
      loading={loading}
      deleteForm={deleteForm}
      uploadForm={uploadForm}
      searchValue={searchValue}
    />
  );
};
