import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { FC, createContext, useMemo } from 'react';
import {
  DeleteUserInput,
  useUserPage_DeleteUserMutation,
} from 'src/types/generated';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';

export interface IDeleteUserProviderContext {
  form: FormikProps<DeleteUserInput> | null;
  loading: boolean;
}

export interface DeleteUserProviderProps {
  deleteUserInput: DeleteUserInput;
  children: JSX.Element;
}

export const DeleteUserProviderContext =
  createContext<IDeleteUserProviderContext>({
    form: null,
    loading: false,
  });

export const DeleteUserProvider: FC<DeleteUserProviderProps> = ({
  children,
  deleteUserInput,
}) => {
  const [deleteUser, { loading, reset }] = useUserPage_DeleteUserMutation();
  const { handleFormError, handleFormSuccess } = useFormHelpers();

  const handleDeleteUserProvider = (
    values: DeleteUserInput,
    helpers: FormikHelpers<DeleteUserInput>,
  ) => {
    deleteUser({
      variables: {
        deleteUserInput: { ...values },
      },
      onCompleted: () =>
        handleFormSuccess({
          reset,
          helpers,
          success: { message: 'User Deleted.', header: 'Success' },
        }),
      onError: (error) => handleFormError({ error, reset, helpers }),
    });
  };

  const form = useFormik({
    initialValues: deleteUserInput,
    onSubmit: handleDeleteUserProvider,
  });

  const value = useMemo(() => ({ form, loading }), [form, loading]);

  return (
    <DeleteUserProviderContext.Provider value={value}>
      {children}
    </DeleteUserProviderContext.Provider>
  );
};
