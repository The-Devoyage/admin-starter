import { FormikProps, FormikHelpers, useFormik } from 'formik';
import { createContext, useMemo, useContext, ReactNode } from 'react';
import { RegisterInput } from 'src/types/generated';
import { useMutation } from '@apollo/client';
import { DocumentNode, ApolloError } from '@apollo/client';
import { AccountBase } from 'src/apollo/types';

interface IRegisterAccountProviderContext<Account extends AccountBase> {
  form: FormikProps<RegisterInput> | null;
  loading: boolean;
  account: Account | null;
}

const RegisterAccountProviderContext = createContext<
  IRegisterAccountProviderContext<AccountBase>
>({
  form: null,
  loading: false,
  account: null,
});

export const useRegisterAccountContext = <Account extends AccountBase>() => {
  const context = useContext<IRegisterAccountProviderContext<Account>>(
    RegisterAccountProviderContext as unknown as React.Context<
      IRegisterAccountProviderContext<Account>
    >,
  );

  if (!context) {
    throw new Error('Register account provider not found.');
  }

  return context;
};

interface RegisterAccountProviderProps<Account extends AccountBase> {
  children: ReactNode;
  mutation: {
    documentNode: DocumentNode;
    variables?: {
      registerInput: RegisterInput;
    };
    refetchQueries?: string[];
    onCompleted: (
      data: Account,
      helpers: FormikHelpers<RegisterInput>,
      reset: () => void,
    ) => void;
    onError: (
      error: ApolloError,
      helpers: FormikHelpers<RegisterInput>,
      reset: () => void,
    ) => void;
  };
}

export const RegisterAccontProvider = <Account extends AccountBase>({
  children,
  mutation,
}: RegisterAccountProviderProps<Account>) => {
  const [registerAccount, { loading, reset, data }] = useMutation(
    mutation.documentNode,
    {
      refetchQueries: mutation.refetchQueries,
    },
  );
  const account = data?.register;

  const handleRegisterAccount = (
    values: RegisterInput,
    helpers: FormikHelpers<RegisterInput>,
  ) => {
    registerAccount({
      variables: {
        registerInput: { ...values },
      },
      onCompleted: (data) =>
        mutation.onCompleted(data?.register, helpers, reset),
      onError: (error) => mutation.onError(error, helpers, reset),
      refetchQueries: mutation.refetchQueries ?? [],
    });
  };

  const form = useFormik<RegisterInput>({
    initialValues: mutation.variables?.registerInput ?? {
      email: '',
      password: '',
    },
    enableReinitialize: true,
    onSubmit: handleRegisterAccount,
  });

  const value = useMemo(
    () => ({
      form,
      loading,
      account,
    }),
    [loading, form, account],
  );

  return (
    <RegisterAccountProviderContext.Provider value={value}>
      {children}
    </RegisterAccountProviderContext.Provider>
  );
};
