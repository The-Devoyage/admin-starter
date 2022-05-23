import { CContainer } from '@coreui/react';
import { Providers } from 'src/apollo';
import { Auth } from 'src/components';

const RegisterPage = () => (
  <CContainer>
    <Providers.Accounts.Mutations.RegisterProvider
      registerInput={{ email: '', password: '' }}
    >
      <Auth.Register.RegisterCard />
    </Providers.Accounts.Mutations.RegisterProvider>
  </CContainer>
);

export default RegisterPage;
