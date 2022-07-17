import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { createContext, FC, ReactNode, useMemo } from 'react';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { CreateMediaInput, useCreateMediaMutation } from 'src/types/generated';

interface ICreateMeidaProviderContext {
  form: FormikProps<CreateMediaInput> | null;
  loading: boolean;
}

export const CreateMediaProviderContext =
  createContext<ICreateMeidaProviderContext>({
    form: null,
    loading: false,
  });

interface CreateMediaProviderProps {
  createMediaInput: CreateMediaInput;
  children: ReactNode;
}

export const CreateMediaProvider: FC<CreateMediaProviderProps> = ({
  children,
  createMediaInput,
}) => {
  const [createMeida, { loading, reset }] = useCreateMediaMutation();
  const { handleFormError, handleFormSuccess } = useFormHelpers();

  const handleCreateMedia = (
    values: CreateMediaInput,
    helpers: FormikHelpers<CreateMediaInput>,
  ) => {
    createMeida({
      variables: {
        createMediaInput: {
          ...values,
        },
      },
      refetchQueries: ['MediasPage_GetMedia'],
      onCompleted: () =>
        handleFormSuccess({
          reset,
          helpers,
          success: {
            header: 'Success',
            message: 'Media Uploaded',
          },
        }),
      onError: (error) =>
        handleFormError({
          error,
          reset,
          helpers,
        }),
    });
  };

  const form = useFormik<CreateMediaInput>({
    initialValues: createMediaInput,
    enableReinitialize: true,
    onSubmit: handleCreateMedia,
  });

  const value = useMemo(
    () => ({
      form,
      loading,
    }),
    [form, loading],
  );

  return (
    <CreateMediaProviderContext.Provider value={value}>
      {children}
    </CreateMediaProviderContext.Provider>
  );
};
