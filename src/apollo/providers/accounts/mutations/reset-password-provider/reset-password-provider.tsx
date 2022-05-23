import { FormikProps, FormikHelpers, useFormik } from 'formik';
import { FC, createContext, useMemo } from 'react';
import {
  ResetPasswordInput,
  useResetPasswordProvider_ResetPasswordMutation,
} from 'src/types/generated';
import { useNavigate } from 'react-router-dom';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { Variables } from 'src/apollo';

interface IResetPasswordProviderContext {
  form: FormikProps<ResetPasswordInput> | null;
  loading: boolean;
}

export const ResetPasswordProviderContext =
  createContext<IResetPasswordProviderContext>({
    form: null,
    loading: false,
  });

export const ResetPasswordProvider: FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { handleFormSuccess, handleFormError } = useFormHelpers();
  const navigate = useNavigate();
  const [resetPassword, { loading, reset }] =
    useResetPasswordProvider_ResetPasswordMutation();

  const handleResetPassword = (
    values: ResetPasswordInput,
    helpers: FormikHelpers<ResetPasswordInput>,
  ) => {
    resetPassword({
      variables: {
        resetInput: { ...values },
      },
      onCompleted: () =>
        handleFormSuccess({
          helpers,
          reset,
          callback: () => {
            if (!Variables.Auth.isAuthenticatedVar()) {
              navigate('/login');
            }
          },
          success: {
            message: 'Account Password Reset',
            header: 'Reset Password',
          },
        }),
      onError: (error) => handleFormError({ reset, helpers, error }),
    });
  };

  const form = useFormik<ResetPasswordInput>({
    initialValues: { email: '', password: '', code: '' },
    onSubmit: handleResetPassword,
  });

  const value = useMemo(() => ({ form, loading }), [form, loading]);

  return (
    <ResetPasswordProviderContext.Provider value={value}>
      {children}
    </ResetPasswordProviderContext.Provider>
  );
};
