import { FC, ReactNode, useContext } from 'react';
import { Providers } from '@the-devoyage/orions-arrow';
import { AccountPageContext } from '../account-page-provider';
import { ACCOUNT_PAGE_INVITE_USER } from '../../operations';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';

interface InviteUserProviderProps {
  children: ReactNode;
}

export const InviteUserProvider: FC<InviteUserProviderProps> = ({
  children,
}) => {
  const { handleFormError, handleFormSuccess } = useFormHelpers();
  const { account_id } = useContext(AccountPageContext);

  return (
    <Providers.Users.Mutations.InviteUserProvider
      mutation={{
        documentNode: ACCOUNT_PAGE_INVITE_USER,
        onCompleted: (_, helpers, reset) =>
          handleFormSuccess({
            helpers,
            reset,
            success: { header: 'Success', message: 'Invite Sent!' },
          }),
        onError: (error, helpers, reset) =>
          handleFormError({ error, helpers, reset }),
        variables: {
          query: {
            _id: [],
          },
          payload: {
            memberships: {
              account: account_id!,
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
