import { FormikProps, FormikHelpers, useFormik } from 'formik';
import { createContext, useMemo, useContext, ReactNode } from 'react';
import { LoginInput } from 'src/types/generated';
import { AccountBase } from 'src/apollo/types';
import { DocumentNode, ApolloError, useMutation } from '@apollo/client';

interface ILoginAccountProviderContext<Account extends AccountBase> {
  form: FormikProps<LoginInput> | null;
  loading: boolean;
  account: Account | null;
}

const LoginAccountProviderContext = createContext<
  ILoginAccountProviderContext<AccountBase>
>({
  form: null,
  loading: false,
  account: null,
});

export const useLoginAccountContext = <Account extends AccountBase>() => {
  const context = useContext<ILoginAccountProviderContext<Account>>(
    LoginAccountProviderContext as unknown as React.Context<
      ILoginAccountProviderContext<Account>
    >,
  );

  if (!context) {
    throw new Error('Login account provider not found.');
  }

  return context;
};

interface LoginAccountProviderProps<Account extends AccountBase> {
  children: ReactNode;
  mutation: {
    documentNode: DocumentNode;
    variables?: {
      loginInput: LoginInput;
    };
    refetchQueries?: { query: DocumentNode }[];
    onCompleted: (
      data: { account: Account; token: string },
      helpers: FormikHelpers<LoginInput>,
      reset: () => void,
    ) => void;
    onError: (
      error: ApolloError,
      helpers: FormikHelpers<LoginInput>,
      reset: () => void,
    ) => void;
  };
}

export const LoginAccountProvider = <Account extends AccountBase>({
  children,
  mutation,
}: LoginAccountProviderProps<Account>) => {
  const [loginAccount, { data, loading, reset }] = useMutation(
    mutation.documentNode,
    { refetchQueries: mutation.refetchQueries ?? [] },
  );
  const account = data?.login?.account;
  const token = data?.login?.token;

  const handleLoginAccount = (
    values: LoginInput,
    helpers: FormikHelpers<LoginInput>,
  ) => {
    loginAccount({
      variables: {
        loginInput: { ...values },
      },
      onCompleted: (data) =>
        mutation.onCompleted(
          { account: data?.login?.account, token: data?.login?.token },
          helpers,
          reset,
        ),
      onError: (error) => mutation.onError(error, helpers, reset),
    });
  };

  const form = useFormik<LoginInput>({
    initialValues: { email: '', password: '' },
    onSubmit: (values, helpers) => handleLoginAccount(values, helpers),
  });

  const value = useMemo(
    () => ({ form, loading, account, token }),
    [form, loading, account, token],
  );

  return (
    <LoginAccountProviderContext.Provider value={value}>
      {children}
    </LoginAccountProviderContext.Provider>
  );
};
