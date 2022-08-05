import { AccountCountWidget } from 'src/components/accounts';
import { MediaCountWidget } from 'src/components/media/media-count-widget';
import { UserCountWidget } from 'src/components/users';

export const DashboardRight = () => {
  return (
    <>
      <AccountCountWidget />
      <UserCountWidget />
      <MediaCountWidget />
    </>
  );
};
