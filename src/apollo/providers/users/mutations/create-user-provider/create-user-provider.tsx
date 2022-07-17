import {
  FC,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
  ReactNode,
} from 'react';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { CreateUserInput, useCreateUserMutation } from 'src/types/generated';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { useLocation, useNavigate } from 'react-router-dom';

interface ICreateUserProviderContext {
  form: FormikProps<CreateUserInput> | null;
  loading: boolean;
  createUserModalVisible: boolean;
  setCreateUserModalVisible: Dispatch<SetStateAction<boolean>>;
}

export const CreateUserProviderContext =
  createContext<ICreateUserProviderContext>({
    form: null,
    loading: true,
    createUserModalVisible: false,
    setCreateUserModalVisible: () => null,
  });

interface CreateUserProviderProps {
  children: ReactNode;
  createUserInput: CreateUserInput;
}

export const CreateUserProvider: FC<CreateUserProviderProps> = ({
  createUserInput,
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleFormError, handleFormSuccess } = useFormHelpers();
  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);
  const [createUser, { loading, reset }] = useCreateUserMutation({
    refetchQueries: ['UsersPage_GetUsers', 'AccountPage_GetAccounts'],
  });

  const handleCreateUser = (
    values: CreateUserInput,
    helpers: FormikHelpers<CreateUserInput>,
  ) => {
    createUser({
      variables: {
        createUserInput: {
          ...values,
        },
      },
      onCompleted: (data) =>
        handleFormSuccess({
          reset,
          helpers,
          callback: () =>
            location.pathname === '/users' &&
            navigate(`/users/user?user_id=${data.createUser._id}`),
          success: { header: 'Success', message: 'User Created!' },
        }),
      onError: (error) =>
        handleFormError({
          reset,
          helpers,
          error,
        }),
    });
  };

  const form = useFormik<CreateUserInput>({
    initialValues: createUserInput,
    onSubmit: handleCreateUser,
    enableReinitialize: true,
  });

  const value = useMemo(
    () => ({
      form,
      loading,
      setCreateUserModalVisible,
      createUserModalVisible,
    }),
    [form, loading, setCreateUserModalVisible, createUserModalVisible],
  );

  return (
    <CreateUserProviderContext.Provider value={value}>
      {children}
    </CreateUserProviderContext.Provider>
  );
};
