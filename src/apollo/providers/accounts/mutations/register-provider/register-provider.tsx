import { FormikProps, FormikHelpers, useFormik } from 'formik';
import {
  FC,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
} from 'react';
import {
  RegisterInput,
  useRegisterProvider_RegisterMutation,
} from 'src/types/generated';
import { useNavigate } from 'react-router-dom';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { Variables } from 'src/apollo';
import { useReactiveVar } from '@apollo/client';

interface IRegisterProviderContext {
  form: FormikProps<RegisterInput> | null;
  loading: boolean;
  createAccountModalVisible: boolean;
  setCreateAccountModalVisible: Dispatch<SetStateAction<boolean>>;
}

interface RegisterProviderProps {
  children: JSX.Element;
  registerInput: RegisterInput;
}

export const RegisterProviderContext = createContext<IRegisterProviderContext>({
  form: null,
  loading: false,
  createAccountModalVisible: false,
  setCreateAccountModalVisible: () => null,
});

export const RegisterProvider: FC<RegisterProviderProps> = ({
  children,
  registerInput,
}) => {
  const { handleFormSuccess, handleFormError } = useFormHelpers();
  const [createAccountModalVisible, setCreateAccountModalVisible] =
    useState(false);
  const navigate = useNavigate();
  const isAuth = useReactiveVar(Variables.Auth.isAuthenticatedVar);
  const [registerAccount, { loading, reset }] =
    useRegisterProvider_RegisterMutation({
      refetchQueries: ['AccountsPage_GetAccounts'],
    });

  const handleRegisterAccount = (
    values: RegisterInput,
    helpers: FormikHelpers<RegisterInput>,
  ) => {
    registerAccount({
      variables: {
        registerInput: { ...values },
      },
      onCompleted: (data) =>
        handleFormSuccess({
          helpers,
          reset,
          callback: () => {
            navigate(
              isAuth
                ? `/accounts/account?account_id=${data.register._id}`
                : '/login',
            );
          },
          success: {
            message: isAuth
              ? 'Account Created.'
              : 'Account Registered. Check Email for Activation.',
            header: 'Success',
          },
        }),
      onError: (error) => handleFormError({ reset, helpers, error }),
    });
  };

  const form = useFormik<RegisterInput>({
    initialValues: registerInput,
    onSubmit: handleRegisterAccount,
  });

  const value = useMemo(
    () => ({
      form,
      loading,
      createAccountModalVisible,
      setCreateAccountModalVisible,
    }),
    [createAccountModalVisible, loading, setCreateAccountModalVisible, form],
  );

  return (
    <RegisterProviderContext.Provider value={value}>
      {children}
    </RegisterProviderContext.Provider>
  );
};
