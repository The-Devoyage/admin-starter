import { FormikProps, FormikHelpers, useFormik } from 'formik';
import { FC, createContext, useMemo } from 'react';
import {
  useVerifyEmailProvider_VerifyEmailMutation,
  VerifyEmailInput,
} from 'src/types/generated';
import { useNavigate } from 'react-router-dom';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';

interface IVerifyEmailProviderContext {
  form: FormikProps<VerifyEmailInput> | null;
  loading: boolean;
}

export const VerifyEmailProviderContext =
  createContext<IVerifyEmailProviderContext>({
    form: null,
    loading: false,
  });

export const VerifyEmailProvider: FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { handleFormSuccess, handleFormError } = useFormHelpers();
  const navigate = useNavigate();
  const [verifyEmail, { loading, reset }] =
    useVerifyEmailProvider_VerifyEmailMutation();

  const handleVerifyEmail = (
    values: VerifyEmailInput,
    helpers: FormikHelpers<VerifyEmailInput>,
  ) => {
    verifyEmail({
      variables: {
        verifyEmailInput: { ...values },
      },
      onCompleted: () =>
        handleFormSuccess({
          helpers,
          reset,
          callback: () => {
            navigate('/login');
          },
          success: {
            message: 'Account Email Verified!',
            header: 'Verify Email',
          },
        }),
      onError: (error) => handleFormError({ reset, helpers, error }),
    });
  };

  const form = useFormik<VerifyEmailInput>({
    initialValues: { email: '', code: '' },
    onSubmit: handleVerifyEmail,
  });

  const value = useMemo(() => ({ form, loading }), [form, loading]);

  return (
    <VerifyEmailProviderContext.Provider value={value}>
      {children}
    </VerifyEmailProviderContext.Provider>
  );
};
