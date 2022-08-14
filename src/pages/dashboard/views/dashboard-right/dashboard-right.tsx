import { AccountCountWidget } from 'src/components/accounts';
import { MediaCountWidget } from 'src/components/media/media-count-widget';
import { UserCountWidget } from 'src/components/users';
import { Hooks } from '@the-devoyage/orions-arrow';

export const DashboardRight = () => {
  const { stats, loading } = Hooks.Accounts.useGetAccountsContext();
  const { stats: userStats, loading: usersLoading } =
    Hooks.Users.useGetUsersContext();

  return (
    <>
      <AccountCountWidget stats={stats} loading={loading} />
      <UserCountWidget stats={userStats} loading={usersLoading} />
      <MediaCountWidget />
    </>
  );
};
