import { FC, ReactNode, useContext } from 'react';
import { Providers } from 'src/apollo';
import { AccountPageContext } from '../account-page-provider';

interface InviteUserProviderProps {
  children: ReactNode;
}

export const InviteUserProvider: FC<InviteUserProviderProps> = ({
  children,
}) => {
  const { account_id } = useContext(AccountPageContext);

  return (
    <Providers.Users.Mutations.InviteUserProvider
      inviteUserInput={{
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
      }}
    >
      {children}
    </Providers.Users.Mutations.InviteUserProvider>
  );
};
