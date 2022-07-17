import { MediaManager } from '@the-devoyage/media-manager';
import { Providers } from 'src/apollo';
import { DeleteMediaInput, StringFilterByEnum } from 'src/types/generated';
import { useToaster } from 'src/common/utils/use-toaster';
import { Dispatch, FC, SetStateAction } from 'react';

interface MediaManagerModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const MediaManagerModal: FC<MediaManagerModalProps> = ({
  visible,
  setVisible,
}) => {
  const { triggerToast } = useToaster();

  return (
    <Providers.Media.Mutations.DeleteMediaProviderContext.Consumer>
      {({ form: deleteForm, loading: deletingMedia }) => (
        <Providers.Media.Mutations.CreateMediaProviderContext.Consumer>
          {({ form: uploadForm, loading: creatingMedia }) => (
            <Providers.Media.Queries.MediaManagerProviderContext.Consumer>
              {({
                media,
                stats,
                loading: fetchingMedia,
                handleSearch,
                handleFetchMore,
                searchValue,
              }) => (
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
            </Providers.Media.Queries.MediaManagerProviderContext.Consumer>
          )}
        </Providers.Media.Mutations.CreateMediaProviderContext.Consumer>
      )}
    </Providers.Media.Mutations.DeleteMediaProviderContext.Consumer>
  );
};
