import { useGetMeContext } from 'src/apollo/providers/users/queries';
import { WelcomeCard } from 'src/components/dashboard';
import { App_MeQuery } from 'src/types/generated';

export const DashboardLeft = () => {
  const { me } = useGetMeContext<App_MeQuery['me']>();
  return <WelcomeCard me={me} />;
};
