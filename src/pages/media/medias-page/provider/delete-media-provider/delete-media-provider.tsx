import { FC, ReactNode } from 'react';
import { Providers } from '@the-devoyage/orions-arrow';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { MEDIAS_PAGE_DELETE_MEDIA } from '../../operations/mutation';

interface DeleteMediaProviderProps {
  children: ReactNode;
}

export const DeleteMediaProvider: FC<DeleteMediaProviderProps> = ({
  children,
}) => {
  const { handleFormSuccess, handleFormError } = useFormHelpers();

  return (
    <Providers.Media.Mutations.DeleteMediaProvider
      mutation={{
        documentNode: MEDIAS_PAGE_DELETE_MEDIA,
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
