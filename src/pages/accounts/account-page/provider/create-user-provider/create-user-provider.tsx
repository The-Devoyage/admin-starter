import { Providers } from '@the-devoyage/orions-arrow';
import { FC, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { CreateUserMutation } from 'src/types/generated';
import { ACCOUNT_PAGE_CREATE_USER } from '../../operations';
import { AccountPageContext } from '../account-page-provider';

interface CreateUserProviderProps {
  children: ReactNode;
}

export const CreateUserProvider: FC<CreateUserProviderProps> = ({
  children,
}) => {
  const { handleFormError, handleFormSuccess } = useFormHelpers();
  const navigate = useNavigate();
  const { account_id } = useContext(AccountPageContext);

  return (
    <Providers.Users.Mutations.CreateUserProvider<
      CreateUserMutation['createUser']
    >
      mutation={{
        documentNode: ACCOUNT_PAGE_CREATE_USER,
        variables: {
          payload: {
            memberships: {
              account: account_id!,
              default: true,
              role: 10,
            },
          },
        },
        onCompleted: (data, helpers, reset) =>
          handleFormSuccess({
            reset,
            helpers,
            callback: () =>
              location.pathname === '/users' &&
              navigate(`/users/user?user_id=${data._id}`),
            success: { header: 'Success', message: 'User Created!' },
          }),
        onError: (error, helpers, reset) =>
          handleFormError({
            reset,
            helpers,
            error,
          }),
      }}
    >
      {children}
    </Providers.Users.Mutations.CreateUserProvider>
  );
};
