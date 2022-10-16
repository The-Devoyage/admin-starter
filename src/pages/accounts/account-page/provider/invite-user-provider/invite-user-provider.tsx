import { FC, ReactNode, useContext } from 'react';
import { Providers } from '@the-devoyage/orions-arrow';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { getOperationName } from 'apollo-link';
import { AccountPageContext } from '../account-page-provider';
import {
  ACCOUNT_PAGE_GET_ACCOUNTS,
  ACCOUNT_PAGE_INVITE_USER,
} from '../../operations';

interface InviteUserProviderProps {
  children: ReactNode;
}

export const InviteUserProvider: FC<InviteUserProviderProps> = ({
  children,
}) => {
  const { handleFormError, handleFormSuccess } = useFormHelpers();
  const { account_id, setInviteUserModalVisible } =
    useContext(AccountPageContext);

  const refetchQueries = [getOperationName(ACCOUNT_PAGE_GET_ACCOUNTS)].filter(
    (q) => q !== null,
  ) as string[];

  if (!account_id) return null;

  return (
    <Providers.Users.Mutations.InviteUserProvider
      mutation={{
        documentNode: ACCOUNT_PAGE_INVITE_USER,
        refetchQueries,
        onCompleted: (_, helpers, reset) =>
          handleFormSuccess({
            helpers,
            reset,
            success: { header: 'Success', message: 'Invite Sent!' },
            callback: () => setInviteUserModalVisible(false),
          }),
        onError: (error, helpers, reset) =>
          handleFormError({ error, helpers, reset }),
        variables: {
          query: {
            _id: [],
          },
          payload: {
            memberships: {
              account: account_id,
              local: {
                first_name: '',
                last_name: '',
                about: '',
                image: undefined,
                phone: '',
                address: {
                  zip: '',
                  city: '',
                  state: '',
                  lineOne: '',
                  lineTwo: '',
                },
              },
            },
          },
        },
      }}
    >
      {children}
    </Providers.Users.Mutations.InviteUserProvider>
  );
};
