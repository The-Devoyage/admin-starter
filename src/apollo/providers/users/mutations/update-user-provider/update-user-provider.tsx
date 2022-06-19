import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import {
  MembershipInput,
  UpdateUserInput,
  UserPage_GetUsersQuery,
  useUserPage_UpdateUserMutation,
} from 'src/types/generated';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';

type UserInputMembershipInput = Pick<
  UpdateUserInput,
  'payload' & { memberships: MembershipInput }
>;

export interface IUpdateUserProviderContext {
  form: FormikProps<UpdateUserInput> | null;
  loading: boolean;
  updateUserModalVisible: boolean;
  setUpdateUserModalVisible: Dispatch<SetStateAction<boolean>>;
  updateUserMembershipModalVisible: boolean;
  setUpdateUserMembershipModalVisible: Dispatch<SetStateAction<boolean>>;
  generateInitialMembershipValues: (
    membership: UserPage_GetUsersQuery['getUsers']['data'][0]['memberships'][0],
  ) => UserInputMembershipInput;
}

export interface UpdateUserProviderProps {
  children: JSX.Element;
  updateUserInput: UpdateUserInput;
}

export const UpdateUserProviderContext =
  createContext<IUpdateUserProviderContext>({
    form: null,
    loading: true,
    updateUserModalVisible: false,
    setUpdateUserModalVisible: () => null,
    updateUserMembershipModalVisible: false,
    setUpdateUserMembershipModalVisible: () => null,
    generateInitialMembershipValues: () => ({}),
  });

export const UpdateUserProvider: FC<UpdateUserProviderProps> = ({
  children,
  updateUserInput,
}) => {
  const { handleFormSuccess, handleFormError } = useFormHelpers();
  const [updateUserModalVisible, setUpdateUserModalVisible] = useState(false);
  const [
    updateUserMembershipModalVisible,
    setUpdateUserMembershipModalVisible,
  ] = useState(false);
  const [updateUser, { loading, reset }] = useUserPage_UpdateUserMutation({
    refetchQueries: ['UsersPage_GetUsers', 'UserPage_GetUsers'],
  });

  const handleUpdateUser = (
    values: UpdateUserInput,
    helpers: FormikHelpers<UpdateUserInput>,
  ) => {
    updateUser({
      variables: {
        updateUserInput: {
          ...values,
        },
      },
      onCompleted: () =>
        handleFormSuccess({
          reset,
          helpers,
          success: {
            header: 'Success!',
            message: 'User successfully updated.',
          },
        }),
      onError: (error) => handleFormError({ error, helpers, reset }),
    });
  };

  const form = useFormik({
    onSubmit: handleUpdateUser,
    initialValues: updateUserInput,
    enableReinitialize: true,
  });

  const value = useMemo(() => {
    const generateInitialMembershipValues = (
      membership: UserPage_GetUsersQuery['getUsers']['data'][0]['memberships'][0],
    ) => {
      const initialMembershipValues: UserInputMembershipInput = {
        memberships: {
          account: membership.account._id,
          role: membership.role,
          status: membership.status,
          default: membership.default,
          local: {
            first_name: membership?.local?.first_name,
            last_name: membership?.local?.last_name,
            phone: membership?.local?.phone,
            about: membership.local?.about,
            image: membership.local?.image?._id,
            address: {
              zip: membership.local?.address?.zip,
              city: membership.local?.address?.city,
              state: membership.local?.address?.state,
              lineOne: membership.local?.address?.lineOne,
              lineTwo: membership.local?.address?.lineTwo,
            },
          },
        },
      };

      return initialMembershipValues;
    };

    return {
      form,
      loading,
      updateUserModalVisible,
      setUpdateUserModalVisible,
      updateUserMembershipModalVisible,
      setUpdateUserMembershipModalVisible,
      generateInitialMembershipValues,
    };
  }, [
    form,
    loading,
    updateUserModalVisible,
    setUpdateUserModalVisible,
    updateUserMembershipModalVisible,
    setUpdateUserMembershipModalVisible,
  ]);

  return (
    <UpdateUserProviderContext.Provider value={value}>
      {children}
    </UpdateUserProviderContext.Provider>
  );
};
