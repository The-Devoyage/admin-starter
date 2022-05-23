import { CContainer } from '@coreui/react';
import { Providers } from 'src/apollo';
import { Auth } from 'src/components';

const ResetPasswordPage = () => (
  <CContainer>
    <Providers.Accounts.Mutations.ResetPasswordProvider>
      <Auth.ResetPassword.ResetPasswordCard />
    </Providers.Accounts.Mutations.ResetPasswordProvider>
  </CContainer>
);

export default ResetPasswordPage;
