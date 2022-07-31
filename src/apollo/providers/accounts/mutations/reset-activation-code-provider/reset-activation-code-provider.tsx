import { FormikProps, FormikHelpers, useFormik } from 'formik';
import { createContext, useMemo, ReactNode, useContext } from 'react';
import { ResetCodeInput } from 'src/types/generated';
import { DocumentNode, ApolloError, useMutation } from '@apollo/client';
import { AccountBase } from 'src/apollo/types';

interface IResetActivationCodeProviderContext<Account extends AccountBase> {
  form: FormikProps<ResetCodeInput> | null;
  loading: boolean;
  account: Account | null;
}

const ResetActivationCodeProviderContext = createContext<
  IResetActivationCodeProviderContext<AccountBase>
>({
  form: null,
  loading: false,
  account: null,
});

export const useResetActivationCodeContext = <
  Account extends AccountBase,
>() => {
  const context = useContext<IResetActivationCodeProviderContext<Account>>(
    ResetActivationCodeProviderContext as unknown as React.Context<
      IResetActivationCodeProviderContext<Account>
    >,
  );

  if (!context) {
    throw new Error('Reset activation code provider not found.');
  }

  return context;
};

interface ResetActivationCodeProviderProps<Account extends AccountBase> {
  children: ReactNode;
  mutation: {
    documentNode: DocumentNode;
    variables?: {
      resetActivationCodeInput: ResetCodeInput;
    };
    refetchQueries?: string[];
    onCompleted: (
      data: Account,
      helpers: FormikHelpers<ResetCodeInput>,
      reset: () => void,
    ) => void;
    onError: (
      error: ApolloError,
      helpers: FormikHelpers<ResetCodeInput>,
      reset: () => void,
    ) => void;
  };
}

export const ResetActivationCodeProvider = <Account extends AccountBase>({
  children,
  mutation,
}: ResetActivationCodeProviderProps<Account>) => {
  const [resetCode, { data, loading, reset }] = useMutation(
    mutation.documentNode,
    {
      refetchQueries: mutation.refetchQueries,
    },
  );
  const account = data?.resetCode;

  const handleRegisterAccount = (
    values: ResetCodeInput,
    helpers: FormikHelpers<ResetCodeInput>,
  ) => {
    resetCode({
      variables: {
        resetCodeInput: { ...values },
      },
      onCompleted: (data) => mutation.onCompleted(data, helpers, reset),
      onError: (error) => mutation.onError(error, helpers, reset),
    });
  };

  const form = useFormik<ResetCodeInput>({
    initialValues: mutation.variables?.resetActivationCodeInput ?? {
      email: '',
    },
    onSubmit: handleRegisterAccount,
    enableReinitialize: true,
  });

  const value = useMemo(
    () => ({ form, loading, account }),
    [form, loading, account],
  );

  return (
    <ResetActivationCodeProviderContext.Provider value={value}>
      {children}
    </ResetActivationCodeProviderContext.Provider>
  );
};
