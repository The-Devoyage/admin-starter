import { FormikProps, FormikHelpers, useFormik } from 'formik';
import { createContext, useMemo, useContext, ReactNode } from 'react';
import { VerifyEmailInput } from 'src/types/generated';
import { DocumentNode, ApolloError, useMutation } from '@apollo/client';
import { AccountBase } from 'src/apollo/types';

interface IVerifyEmailProviderContext<Account extends AccountBase> {
  form: FormikProps<VerifyEmailInput> | null;
  loading: boolean;
  account: Account | null;
}

const VerifyEmailProviderContext = createContext<
  IVerifyEmailProviderContext<AccountBase>
>({
  form: null,
  loading: false,
  account: null,
});

export const useVerifyAccountEmailContext = <Account extends AccountBase>() => {
  const context = useContext<IVerifyEmailProviderContext<Account>>(
    VerifyEmailProviderContext as unknown as React.Context<
      IVerifyEmailProviderContext<Account>
    >,
  );

  if (!context) {
    throw new Error('Verify account email provider not found.');
  }

  return context;
};

interface VerifyEmailProviderProps<Account extends AccountBase> {
  children: ReactNode;
  mutation: {
    documentNode: DocumentNode;
    variables?: {
      verifyEmailInput: VerifyEmailInput;
    };
    refetchQueries?: string[];
    onCompleted: (
      data: Account,
      helpers: FormikHelpers<VerifyEmailInput>,
      reset: () => void,
    ) => void;
    onError: (
      error: ApolloError,
      helpers: FormikHelpers<VerifyEmailInput>,
      reset: () => void,
    ) => void;
  };
}

export const VerifyEmailProvider = <Account extends AccountBase>({
  children,
  mutation,
}: VerifyEmailProviderProps<Account>) => {
  const [verifyEmail, { data, loading, reset }] = useMutation(
    mutation.documentNode,
    {
      refetchQueries: mutation.refetchQueries,
    },
  );

  const account = data?.verifyEmail;

  const handleVerifyEmail = (
    values: VerifyEmailInput,
    helpers: FormikHelpers<VerifyEmailInput>,
  ) => {
    verifyEmail({
      variables: {
        verifyEmailInput: { ...values },
      },
      onCompleted: (data) =>
        mutation.onCompleted(data?.verifyEmail, helpers, reset),
      onError: (error) => mutation.onError(error, helpers, reset),
    });
  };

  const form = useFormik<VerifyEmailInput>({
    initialValues: mutation.variables?.verifyEmailInput ?? {
      email: '',
      code: '',
    },
    onSubmit: handleVerifyEmail,
  });

  const value = useMemo(
    () => ({ form, loading, account }),
    [form, loading, account],
  );

  return (
    <VerifyEmailProviderContext.Provider value={value}>
      {children}
    </VerifyEmailProviderContext.Provider>
  );
};
