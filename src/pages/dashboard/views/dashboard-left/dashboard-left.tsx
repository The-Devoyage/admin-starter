import { Hooks } from '@the-devoyage/orions-arrow';
import { WelcomeCard } from 'src/components/dashboard';
import { App_MeQuery } from 'src/types/generated';

export const DashboardLeft = () => {
  const { me } = Hooks.Users.useGetMe<App_MeQuery['me']>();
  return <WelcomeCard me={me} />;
};
