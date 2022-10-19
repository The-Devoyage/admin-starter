import { MediaManager as DMediaManager } from '@the-devoyage/media-manager';
import {
  DeleteMediaInput,
  MediaManager_GetMediaQuery,
  StringFilterByEnum,
} from 'src/types/generated';
import { useToaster } from 'src/common/utils/use-toaster';
import { Dispatch, FC, SetStateAction } from 'react';
import { Hooks } from '@the-devoyage/orions-arrow';
import { MediaManagerModalRootProvider } from './provider';

interface MediaManagerModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const MediaManager: FC<MediaManagerModalProps> = ({ visible, setVisible }) => {
  const { triggerToast } = useToaster();
  const { form: uploadForm, loading: uploading } = Hooks.Media.useCreateMedia();
  const { form: deleteForm, loading: deleting } = Hooks.Media.useDeleteMedia();
  const {
    media,
    stats,
    handleFetchMore,
    handleSearch,
    searchValue,
    loading: fetching,
  } = Hooks.Media.useGetMedia<
    MediaManager_GetMediaQuery['getMedia']['data'][0]
  >();
  const loading = fetching || uploading || deleting;

  return (
    <DMediaManager
      media={media}
      hasMore={!!stats?.remaining}
      loading={loading}
      visible={visible}
      setVisible={(b) => setVisible(b)}
      selectLimit={2}
      onHandleSearch={(v) => handleSearch(v)}
      onRequestMore={handleFetchMore}
      searchValue={searchValue}
      onMediaDelete={(m) => {
        deleteForm?.setFieldValue('query', {
          _id: m.map((med) => ({
            string: med._id,
            filterBy: StringFilterByEnum.Objectid,
          })),
        } as DeleteMediaInput['query']);
        deleteForm?.submitForm();
      }}
      onUpload={(m) => {
        uploadForm?.setFieldValue('payload', m.media);
        uploadForm?.submitForm();
      }}
      onNotification={({ title, message }) =>
        triggerToast({ header: title, message })
      }
      acceptFileTypes="pdf png jpg jpeg"
      validUploadMimeTypes={['image/png', 'image/jpg', 'image/jpeg']}
    />
  );
};

export const MediaManagerModal: FC<MediaManagerModalProps> = ({
  visible,
  setVisible,
}) => (
  <MediaManagerModalRootProvider>
    <MediaManager visible={visible} setVisible={setVisible} />
  </MediaManagerModalRootProvider>
);
