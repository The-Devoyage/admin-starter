import { FormikProps, FormikHelpers, useFormik } from 'formik';
import { FC, createContext, useMemo, ReactNode } from 'react';
import {
  ResetCodeInput,
  useResetActivationCodeProvider_ResetActivationCodeMutation,
} from 'src/types/generated';
import { useNavigate } from 'react-router-dom';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { Variables } from 'src/apollo';

interface IResetActivationCodeProviderContext {
  form: FormikProps<ResetCodeInput> | null;
  loading: boolean;
}

export const ResetActivationCodeProviderContext =
  createContext<IResetActivationCodeProviderContext>({
    form: null,
    loading: false,
  });

export const ResetActivationCodeProvider: FC<{
  children: ReactNode;
  resetCodeInput: ResetCodeInput;
}> = ({ children, resetCodeInput }) => {
  const { handleFormSuccess, handleFormError } = useFormHelpers();
  const navigate = useNavigate();
  const [resetCode, { loading, reset }] =
    useResetActivationCodeProvider_ResetActivationCodeMutation({
      refetchQueries: ['AccountPage_GetAccounts'],
    });

  const handleRegisterAccount = (
    values: ResetCodeInput,
    helpers: FormikHelpers<ResetCodeInput>,
  ) => {
    resetCode({
      variables: {
        resetCodeInput: { ...values },
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
            message: 'Email sent with Activation Instructions.',
            header: 'Code Updated',
          },
        }),
      onError: (error) => handleFormError({ reset, helpers, error }),
    });
  };

  const form = useFormik<ResetCodeInput>({
    initialValues: resetCodeInput,
    onSubmit: handleRegisterAccount,
    enableReinitialize: true,
  });

  const value = useMemo(() => ({ form, loading }), [form, loading]);

  return (
    <ResetActivationCodeProviderContext.Provider value={value}>
      {children}
    </ResetActivationCodeProviderContext.Provider>
  );
};
