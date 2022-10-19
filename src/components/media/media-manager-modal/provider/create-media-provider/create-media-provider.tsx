import { Providers } from '@the-devoyage/orions-arrow';
import { FC, ReactNode } from 'react';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { MEDIAS_PAGE_CREATE_MEDIA } from '../../operations/mutation';

interface CreateMediaProviderProps {
  children: ReactNode;
}

export const CreateMediaProvider: FC<CreateMediaProviderProps> = ({
  children,
}) => {
  const { handleFormSuccess, handleFormError } = useFormHelpers();

  return (
    <Providers.Media.Mutations.CreateMediaProvider
      mutation={{
        documentNode: MEDIAS_PAGE_CREATE_MEDIA,
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
