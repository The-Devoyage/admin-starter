import { MediaManager } from '@the-devoyage/media-manager';
import {
  DeleteMediaInput,
  StringFilterByEnum,
  Media,
  Stats,
  CreateMediaInput,
} from 'src/types/generated';
import { useToaster } from 'src/common/utils/use-toaster';
import { Dispatch, FC, SetStateAction } from 'react';
import { FormikProps } from 'formik';

interface MediaManagerModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  media: Pick<Media, '_id' | 'title' | 'src' | 'mimetype'>[];
  stats?: Stats;
  loading: boolean;
  handleSearch: (v: string) => void;
  handleFetchMore: () => void;
  searchValue?: string;
  deleteForm: FormikProps<DeleteMediaInput> | null;
  uploadForm: FormikProps<CreateMediaInput> | null;
}

export const MediaManagerModal: FC<MediaManagerModalProps> = ({
  visible,
  setVisible,
  media,
  stats,
  loading,
  handleSearch,
  handleFetchMore,
  searchValue,
  deleteForm,
  uploadForm,
}) => {
  const { triggerToast } = useToaster();
  return (
    <MediaManager
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
