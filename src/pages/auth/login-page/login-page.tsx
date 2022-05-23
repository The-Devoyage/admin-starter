import { CContainer } from '@coreui/react';
import { Providers } from 'src/apollo';
import { Auth } from 'src/components';

const LoginPage = () => (
  <CContainer>
    <Providers.Users.Mutations.LoginUserProvider>
      <Providers.Users.Mutations.LoginUserProviderContext.Consumer>
        {({ handleLoginUser }) => (
          <Providers.Accounts.Mutations.LoginProvider
            onComplete={handleLoginUser}
          >
            <Auth.Login.LoginCard />
          </Providers.Accounts.Mutations.LoginProvider>
        )}
      </Providers.Users.Mutations.LoginUserProviderContext.Consumer>
    </Providers.Users.Mutations.LoginUserProvider>
  </CContainer>
);

export default LoginPage;
