import { MediaCountWidget } from 'src/components/media/media-count-widget';
import { UserCountWidget } from 'src/components/users';
import { Hooks } from '@the-devoyage/orions-arrow';

export const DashboardRight = () => {
  const { stats: userStats, loading: usersLoading } = Hooks.Users.useGetUsers();
  const { stats: mediaStats, loading: mediaLoading } = Hooks.Media.useGetMedia();

  return (
    <>
      <UserCountWidget stats={userStats} loading={usersLoading} className="mb-3" />
      <MediaCountWidget stats={mediaStats} loading={mediaLoading} />
    </>
  );
};
