import { MediaManager } from '@the-devoyage/media-manager';
import { Providers } from 'src/apollo';
import {
  DeleteMediaInput,
  MediaManager_GetMediaQuery,
  StringFilterByEnum,
} from 'src/types/generated';
import { useToaster } from 'src/common/utils/use-toaster';
import { Dispatch, FC, SetStateAction } from 'react';
import { useGetMediaContext } from 'src/apollo/providers/media/queries';

interface MediaManagerModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const MediaManagerModal: FC<MediaManagerModalProps> = ({
  visible,
  setVisible,
}) => {
  const { triggerToast } = useToaster();
  const {
    media,
    stats,
    loading: fetchingMedia,
    handleSearch,
    handleFetchMore,
    searchValue,
  } = useGetMediaContext<MediaManager_GetMediaQuery['getMedia']['data'][0]>();

  return (
    <Providers.Media.Mutations.DeleteMediaProviderContext.Consumer>
      {({ form: deleteForm, loading: deletingMedia }) => (
        <Providers.Media.Mutations.CreateMediaProviderContext.Consumer>
          {({ form: uploadForm, loading: creatingMedia }) => (
            <MediaManager
              media={media}
              hasMore={!!stats?.remaining}
              loading={fetchingMedia || creatingMedia || deletingMedia}
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
            />
          )}
        </Providers.Media.Mutations.CreateMediaProviderContext.Consumer>
      )}
    </Providers.Media.Mutations.DeleteMediaProviderContext.Consumer>
  );
};
