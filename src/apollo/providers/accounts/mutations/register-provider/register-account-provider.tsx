import { FormikProps, FormikHelpers, useFormik } from 'formik';
import { createContext, useMemo, useContext, ReactNode } from 'react';
import { Account, RegisterInput } from 'src/types/generated';
import { useMutation } from '@apollo/client';
import { DeepPartial } from 'src/apollo/utils';
import { DocumentNode, ApolloError } from '@apollo/client';

type AccountBase = DeepPartial<Account>;

interface IRegisterAccountProviderContext<A extends AccountBase> {
  form: FormikProps<RegisterInput> | null;
  loading: boolean;
  account: A | null;
}

const RegisterAccountProviderContext = createContext<
  IRegisterAccountProviderContext<AccountBase>
>({
  form: null,
  loading: false,
  account: null,
});

export const useRegisterAccountContext = <A extends AccountBase>() => {
  const context = useContext<IRegisterAccountProviderContext<A>>(
    RegisterAccountProviderContext as unknown as React.Context<
      IRegisterAccountProviderContext<A>
    >,
  );

  if (!context) {
    throw new Error('Register provider not found.');
  }
  return context;
};

interface RegisterAccountProviderProps<A extends AccountBase> {
  children: ReactNode;
  mutation: {
    documentNode: DocumentNode;
    variables?: {
      registerInput: RegisterInput;
    };
    refetchQueries?: { query: DocumentNode }[];
    onCompleted: (
      data: A,
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

export const RegisterAccontProvider = <A extends AccountBase>({
  children,
  mutation,
}: RegisterAccountProviderProps<A>) => {
  const [registerAccount, { loading, reset, data }] = useMutation(
    mutation.documentNode,
    {
      refetchQueries: mutation.refetchQueries ?? [],
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
        mutation.onCompleted(data.register, helpers, reset),
      onError: (error) => mutation.onError(error, helpers, reset),
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
