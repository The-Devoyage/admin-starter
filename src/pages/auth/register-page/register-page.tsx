import { CContainer } from '@coreui/react';
import { Providers } from 'src/apollo';
import { Auth } from 'src/components';
import { REGISTER_PAGE_REGISTER_ACCOUNT } from './mutations';

const RegisterPage = () => (
  <CContainer>
    <Providers.Accounts.Mutations.RegisterAccontProvider
      mutation={{
        documentNode: REGISTER_PAGE_REGISTER_ACCOUNT,
      }}
    >
      <Auth.Register.RegisterCard />
    </Providers.Accounts.Mutations.RegisterAccontProvider>
  </CContainer>
);

export default RegisterPage;
