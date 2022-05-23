import { CContainer } from '@coreui/react';
import { Providers } from 'src/apollo';
import { Auth } from 'src/components';

const ResetActivationCodePage = () => (
  <CContainer>
    <Providers.Accounts.Mutations.ResetActivationCodeProvider
      resetCodeInput={{ email: '' }}
    >
      <Auth.ResetCode.ResetActivationCodeCard />
    </Providers.Accounts.Mutations.ResetActivationCodeProvider>
  </CContainer>
);

export default ResetActivationCodePage;
