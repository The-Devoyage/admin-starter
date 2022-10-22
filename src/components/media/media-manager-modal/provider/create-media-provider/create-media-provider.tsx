import { Providers } from '@the-devoyage/orions-arrow';
import { getOperationName } from 'apollo-link';
import { FC, ReactNode } from 'react';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { MEDIA_LIST_GET_MEDIA } from 'src/pages/media/medias-page/operations';
import { MEDIA_MANAGER_GET_MEDIA } from '../../operations';
import { MEDIAS_PAGE_CREATE_MEDIA } from '../../operations/mutation';

interface CreateMediaProviderProps {
  children: ReactNode;
}

export const CreateMediaProvider: FC<CreateMediaProviderProps> = ({
  children,
}) => {
  const { handleFormSuccess, handleFormError } = useFormHelpers();

  const refetchQueries = [
    getOperationName(MEDIA_LIST_GET_MEDIA),
    getOperationName(MEDIA_MANAGER_GET_MEDIA),
  ].filter((q) => q !== null) as string[];

  return (
    <Providers.Media.Mutations.CreateMediaProvider
      mutation={{
        documentNode: MEDIAS_PAGE_CREATE_MEDIA,
        refetchQueries,
        onCompleted: (_, helpers, reset) =>
          handleFormSuccess({
            reset,
            helpers,
            success: {
              header: 'Success',
              message: 'Media Uploaded',
            },
          }),
        onError: (error, helpers, reset) =>
          handleFormError({
            error,
            reset,
            helpers,
          }),
      }}
    >
      {children}
    </Providers.Media.Mutations.CreateMediaProvider>
  );
};
