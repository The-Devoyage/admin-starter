import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { createContext, FC, ReactNode, useMemo } from 'react';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { DeleteMediaInput, useDeleteMediaMutation } from 'src/types/generated';

interface IDeleteMediaProviderContext {
  form: FormikProps<DeleteMediaInput> | null;
  loading: boolean;
}

export const DeleteMediaProviderContext =
  createContext<IDeleteMediaProviderContext>({
    form: null,
    loading: false,
  });

interface DeleteMediaProviderProps {
  deleteMediaInput: DeleteMediaInput;
  children: ReactNode;
}

export const DeleteMediaProvider: FC<DeleteMediaProviderProps> = ({
  children,
  deleteMediaInput,
}) => {
  const [deleteMedia, { loading, reset }] = useDeleteMediaMutation({
    refetchQueries: ['MediasPage_GetMedia'],
  });
  const { handleFormError, handleFormSuccess } = useFormHelpers();

  const handleDeleteMeida = (
    values: DeleteMediaInput,
    helpers: FormikHelpers<DeleteMediaInput>,
  ) => {
    deleteMedia({
      variables: {
        deleteMediaInput: values,
      },
      onError: (error) => handleFormError({ error, reset, helpers }),
      onCompleted: () =>
        handleFormSuccess({
          reset,
          success: { header: 'Success', message: 'Media Deleted' },
          helpers,
        }),
    });
  };

  const form = useFormik<DeleteMediaInput>({
    initialValues: deleteMediaInput,
    enableReinitialize: true,
    onSubmit: handleDeleteMeida,
  });

  const value = useMemo(
    () => ({
      form,
      loading,
    }),
    [form, loading],
  );

  return (
    <DeleteMediaProviderContext.Provider value={value}>
      {children}
    </DeleteMediaProviderContext.Provider>
  );
};
