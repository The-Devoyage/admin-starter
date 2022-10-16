import { CCallout, CCardTitle } from '@coreui/react';
import { AccountCountWidget } from 'src/components/accounts';
import { FC } from 'react';
import { Utils } from 'src/common';
import { User } from 'src/types/generated';
import { Hooks } from '@the-devoyage/orions-arrow';

interface WelcomeCardProps {
  me: Pick<User, 'first_name' | 'last_name' | 'email'> | null;
}

export const WelcomeCard: FC<WelcomeCardProps> = ({ me }) => {
  const { stats, loading } = Hooks.Accounts.useGetAccounts();

  return (
    <>
      <CCallout
        color="success"
        className="mb-3"
        style={{ backgroundColor: 'white' }}
      >
        <CCardTitle>
          {`Welcome, ${Utils.Users.determineName(null, me)}!`}
        </CCardTitle>
        Your operations portal is designed to make it easy to manage the assets
        of your business including Users, File Uploads (Media), and Accounts.
      </CCallout>
      <AccountCountWidget stats={stats} loading={loading} />
    </>
  );
};
