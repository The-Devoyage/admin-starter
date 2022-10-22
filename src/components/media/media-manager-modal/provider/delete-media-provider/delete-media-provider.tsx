import { FC, ReactNode } from 'react';
import { Providers } from '@the-devoyage/orions-arrow';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { getOperationName } from 'apollo-link';
import { MEDIA_LIST_GET_MEDIA } from 'src/pages/media/medias-page/operations';
import { MEDIA_MANAGER_GET_MEDIA } from '../../operations';
import { MEDIAS_PAGE_DELETE_MEDIA } from '../../operations/mutation';

interface DeleteMediaProviderProps {
  children: ReactNode;
}

export const DeleteMediaProvider: FC<DeleteMediaProviderProps> = ({
  children,
}) => {
  const { handleFormSuccess, handleFormError } = useFormHelpers();

  const refetchQueries = [
    getOperationName(MEDIA_LIST_GET_MEDIA),
    getOperationName(MEDIA_MANAGER_GET_MEDIA),
  ].filter((q) => q !== null) as string[];

  return (
    <Providers.Media.Mutations.DeleteMediaProvider
      mutation={{
        documentNode: MEDIAS_PAGE_DELETE_MEDIA,
        refetchQueries,
        onCompleted: (_, helpers, reset) =>
          handleFormSuccess({
            reset,
            success: { header: 'Success', message: 'Media Deleted' },
            helpers,
          }),
        onError: (error, helpers, reset) =>
          handleFormError({ error, reset, helpers }),
      }}
    >
      {children}
    </Providers.Media.Mutations.DeleteMediaProvider>
  );
};
