import { FormikProps, FormikHelpers, useFormik } from 'formik';
import { FC, createContext, useMemo, useContext, ReactNode } from 'react';
import { ResetPasswordInput } from 'src/types/generated';
import { DocumentNode, ApolloError, useMutation } from '@apollo/client';
import { AccountBase } from 'src/apollo/types';

interface IResetPasswordProviderContext<Account extends AccountBase> {
  form: FormikProps<ResetPasswordInput> | null;
  loading: boolean;
  account: Account | null;
}

const ResetPasswordProviderContext = createContext<
  IResetPasswordProviderContext<AccountBase>
>({
  form: null,
  loading: false,
  account: null,
});

export const useResetAccountPasswordContext = <
  Account extends AccountBase,
>() => {
  const context = useContext<IResetPasswordProviderContext<Account>>(
    ResetPasswordProviderContext as unknown as React.Context<
      IResetPasswordProviderContext<Account>
    >,
  );

  if (!context) {
    throw new Error('Reset account provider not found.');
  }

  return context;
};

interface ResetPasswordProviderProps<Account extends AccountBase> {
  children: ReactNode;
  mutation: {
    documentNode: DocumentNode;
    variables?: {
      registerInput: ResetPasswordInput;
    };
    refetchQueries?: string[];
    onCompleted: (
      data: Account,
      helpers: FormikHelpers<ResetPasswordInput>,
      reset: () => void,
    ) => void;
    onError: (
      error: ApolloError,
      helpers: FormikHelpers<ResetPasswordInput>,
      reset: () => void,
    ) => void;
  };
}

export const ResetPasswordProvider = <Account extends AccountBase>({
  children,
  mutation,
}: ResetPasswordProviderProps<Account>) => {
  const [resetPassword, { loading, reset, data }] = useMutation(
    mutation.documentNode,
    {
      refetchQueries: mutation.refetchQueries,
    },
  );

  const account = data?.resetPassword;

  const handleResetPassword = (
    values: ResetPasswordInput,
    helpers: FormikHelpers<ResetPasswordInput>,
  ) => {
    resetPassword({
      variables: {
        resetInput: { ...values },
      },
      onCompleted: (data) =>
        mutation.onCompleted(data?.resetPassword, helpers, reset),
      onError: (error) => mutation.onError(error, helpers, reset),
    });
  };

  const form = useFormik<ResetPasswordInput>({
    initialValues: mutation.variables?.registerInput ?? {
      email: '',
      password: '',
      code: '',
    },
    onSubmit: handleResetPassword,
  });

  const value = useMemo(
    () => ({ form, loading, account }),
    [form, loading, account],
  );

  return (
    <ResetPasswordProviderContext.Provider value={value}>
      {children}
    </ResetPasswordProviderContext.Provider>
  );
};
