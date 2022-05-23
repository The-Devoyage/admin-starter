import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import {
  InviteUserInput,
  useUsersPage_InviteUserMutation,
} from 'src/types/generated';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';

export interface IInviteUserProviderContext {
  form: FormikProps<InviteUserInput> | null;
  loading: boolean;
  inviteUsersModalVisible: boolean;
  setInviteUserModalVisible: Dispatch<SetStateAction<boolean>>;
}

export interface InviteUserProviderProps {
  children: ReactNode;
  inviteUserInput: InviteUserInput;
}

export const InviteUserProviderContext =
  createContext<IInviteUserProviderContext>({
    loading: false,
    form: null,
    inviteUsersModalVisible: false,
    setInviteUserModalVisible: () => null,
  });

export const InviteUserProvider: FC<InviteUserProviderProps> = ({
  children,
  inviteUserInput,
}) => {
  const [inviteUser, { loading, reset }] = useUsersPage_InviteUserMutation({
    refetchQueries: ['UsersPage_GetUsers', 'AccountPage_GetAccounts'],
  });
  const { handleFormError, handleFormSuccess } = useFormHelpers();
  const [inviteUsersModalVisible, setInviteUserModalVisible] = useState(false);

  const handleInviteUser = (
    values: InviteUserInput,
    helpers: FormikHelpers<InviteUserInput>,
  ) => {
    inviteUser({
      variables: {
        inviteUserInput: {
          ...values,
        },
      },
      onCompleted: () =>
        handleFormSuccess({
          helpers,
          reset,
          success: { header: 'Success', message: 'Invite Sent!' },
        }),
      onError: (error) => handleFormError({ error, reset, helpers }),
    });
  };

  const form = useFormik({
    onSubmit: handleInviteUser,
    initialValues: inviteUserInput,
    enableReinitialize: true,
  });

  const value = useMemo(
    () => ({
      form,
      loading,
      inviteUsersModalVisible,
      setInviteUserModalVisible,
    }),
    [form, loading, inviteUsersModalVisible, setInviteUserModalVisible],
  );

  return (
    <InviteUserProviderContext.Provider value={value}>
      {children}
    </InviteUserProviderContext.Provider>
  );
};
