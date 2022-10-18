import { Hooks } from '@the-devoyage/orions-arrow';
import { WelcomeCard } from 'src/components/dashboard';
import { App_MeQuery } from 'src/types/generated';
import { AccountCountWidget } from 'src/components/accounts';
import { CCol } from '@coreui/react';

export const DashboardLeft = () => {
  const { me } = Hooks.Users.useGetMe<App_MeQuery['me']>();
  const { stats, loading: loadingAccounts } = Hooks.Accounts.useGetAccounts();

  return (
    <>
      <CCol className="mb-3">
        <WelcomeCard me={me} />
      </CCol>
      <CCol>
        <AccountCountWidget stats={stats} loading={loadingAccounts} />
      </CCol>
    </>
  );
};
