import { FormikProps, FormikHelpers, useFormik } from 'formik';
import { FC, createContext, useMemo } from 'react';
import {
  LoginInput,
  useLoginProvider_LoginMutation,
} from 'src/types/generated';
import { useNavigate } from 'react-router-dom';
import { Variables } from 'src/apollo';
import { Utils } from 'src/common';

interface ILoginProviderContext {
  form: FormikProps<LoginInput> | null;
  loading: boolean;
}

export const LoginProviderContext = createContext<ILoginProviderContext>({
  form: null,
  loading: false,
});

export const LoginProvider: FC<{
  children: JSX.Element;
  onComplete?: () => void;
}> = ({ children, onComplete }) => {
  const [loginAccount, { loading, reset }] = useLoginProvider_LoginMutation();

  const navigate = useNavigate();
  const { handleFormError, handleFormSuccess } = Utils.useFormHelpers();

  const handleLoginAccount = (
    values: LoginInput,
    helpers: FormikHelpers<LoginInput>,
  ) => {
    loginAccount({
      variables: {
        loginInput: { ...values },
      },
      onCompleted: (data) => {
        localStorage.setItem('token', data.login.token);
        if (onComplete) {
          onComplete();
        } else {
          handleFormSuccess({
            reset,
            helpers,
            success: {
              header: 'Login Account',
              message:
                'Account Login Successful. Limited access due to missing user login.',
            },
          });
          Variables.Auth.isAuthenticatedVar(true);
          navigate('/');
        }
      },
      onError: (error) => {
        localStorage.removeItem('user');
        handleFormError({
          error,
          reset,
          helpers,
        });
      },
    });
  };

  const form = useFormik<LoginInput>({
    initialValues: { email: '', password: '' },
    onSubmit: (values, helpers) => handleLoginAccount(values, helpers),
  });

  const value = useMemo(() => ({ form, loading }), [form, loading]);

  return (
    <LoginProviderContext.Provider value={value}>
      {children}
    </LoginProviderContext.Provider>
  );
};
