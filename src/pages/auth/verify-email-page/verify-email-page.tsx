import { CContainer } from '@coreui/react';
import { Providers } from 'src/apollo';
import { Auth } from 'src/components';

const VerifyEmailPage = () => (
  <CContainer>
    <Providers.Accounts.Mutations.VerifyEmailProvider>
      <Auth.VerifyEmail.VerifyEmailCard />
    </Providers.Accounts.Mutations.VerifyEmailProvider>
  </CContainer>
);

export default VerifyEmailPage;
