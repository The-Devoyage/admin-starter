import { FC, ReactNode } from 'react';
import { Variables } from 'src/apollo';
import { Providers } from '@the-devoyage/orions-arrow';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { AccountPage_GetAccountsQuery } from 'src/types/generated';
import { useNavigate } from 'react-router-dom';
import {
  ACCOUNTS_PAGE_GET_ACCOUNTS,
  ACCOUNTS_PAGE_REGISTER_ACCOUNT,
} from '../../operations';
import { getOperationName } from 'apollo-link';

interface RegisterAccountProviderProps {
  children: ReactNode;
}
export const RegisterAccountProvider: FC<RegisterAccountProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  const isAuth = Variables.Auth.isAuthenticatedVar();

  const { handleFormSuccess, handleFormError } = useFormHelpers();

  const refetchQueries = [getOperationName(ACCOUNTS_PAGE_GET_ACCOUNTS)].filter(
    (q) => q !== null,
  ) as string[];

  return (
    <Providers.Accounts.Mutations.RegisterAccontProvider<
      AccountPage_GetAccountsQuery['getAccounts']['data'][0]
    >
      mutation={{
        documentNode: ACCOUNTS_PAGE_REGISTER_ACCOUNT,
        refetchQueries,
        onCompleted: (account, helpers, reset) =>
          handleFormSuccess({
            helpers,
            reset,
            callback: () => {
              navigate(
                isAuth
                  ? `/accounts/account?account_id=${account._id}`
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
        onError: (error, helpers, reset) =>
          handleFormError({ reset, helpers, error }),
      }}
    >
      {children}
    </Providers.Accounts.Mutations.RegisterAccontProvider>
  );
};
