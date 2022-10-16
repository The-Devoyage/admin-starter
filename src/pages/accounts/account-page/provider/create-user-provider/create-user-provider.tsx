import { Providers } from '@the-devoyage/orions-arrow';
import { getOperationName } from 'apollo-link';
import { FC, ReactNode, useContext } from 'react';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { CreateUserMutation } from 'src/types/generated';
import {
  ACCOUNT_PAGE_CREATE_USER,
  ACCOUNT_PAGE_GET_ACCOUNTS,
} from '../../operations';
import { AccountPageContext } from '../account-page-provider';

interface CreateUserProviderProps {
  children: ReactNode;
}

export const CreateUserProvider: FC<CreateUserProviderProps> = ({
  children,
}) => {
  const { handleFormError, handleFormSuccess } = useFormHelpers();
  const { account_id, setCreateUserModalVisible } =
    useContext(AccountPageContext);

  const refetchQueries = [getOperationName(ACCOUNT_PAGE_GET_ACCOUNTS)].filter(
    (q) => q !== null,
  ) as string[];

  if (!account_id) return null;

  return (
    <Providers.Users.Mutations.CreateUserProvider<
      CreateUserMutation['createUser']
    >
      mutation={{
        documentNode: ACCOUNT_PAGE_CREATE_USER,
        refetchQueries,
        variables: {
          payload: {
            memberships: {
              account: account_id,
              default: true,
              role: 10,
            },
          },
        },
        onCompleted: (_, helpers, reset) =>
          handleFormSuccess({
            reset,
            helpers,
            callback: () => setCreateUserModalVisible(false),
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
