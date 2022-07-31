import { getOperationName } from 'apollo-link';
import { FC, ReactNode, useContext } from 'react';
import { Providers } from 'src/apollo';
import { useGetAccountsContext } from 'src/apollo/providers/accounts/queries';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { AccountPage_GetAccountsQuery } from 'src/types/generated';
import {
  ACCOUNT_PAGE_GET_ACCOUNTS,
  ACCOUNT_PAGE_RESET_ACTIVATION_CODE,
} from '../../operations';
import { AccountPageContext } from '../account-page-provider';

interface ResetActivationCodeProviderProps {
  children: ReactNode;
}

export const ResetActivationCodeProvider: FC<
  ResetActivationCodeProviderProps
> = ({ children }) => {
  const { handleFormSuccess, handleFormError } = useFormHelpers();

  const { account_id } = useContext(AccountPageContext);

  const { utils } =
    useGetAccountsContext<
      AccountPage_GetAccountsQuery['getAccounts']['data'][0]
    >();

  const account = utils.getAccount(account_id!);

  const refetchQueries = [getOperationName(ACCOUNT_PAGE_GET_ACCOUNTS)].filter(
    (q) => q !== null,
  ) as string[];

  return (
    <Providers.Accounts.Mutations.ResetActivationCodeProvider
      mutation={{
        documentNode: ACCOUNT_PAGE_RESET_ACTIVATION_CODE,
        refetchQueries,
        variables: {
          resetActivationCodeInput: {
            email: account?.email!,
          },
        },
        onCompleted: (_, helpers, reset) =>
          handleFormSuccess({
            helpers,
            reset,
            success: {
              message: 'Email sent with Activation Instructions.',
              header: 'Code Updated',
            },
          }),
        onError: (error, helpers, reset) =>
          handleFormError({ reset, helpers, error }),
      }}
    >
      {children}
    </Providers.Accounts.Mutations.ResetActivationCodeProvider>
  );
};
