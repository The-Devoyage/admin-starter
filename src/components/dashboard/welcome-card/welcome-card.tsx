import { CCard, CCardBody, CCardTitle } from '@coreui/react';
import { Providers } from 'src/apollo';
import { Utils } from 'src/common';

export const WelcomeCard = () => (
  <Providers.Users.Queries.AppMeProviderContext.Consumer>
    {({ me }) => (
      <CCard>
        <CCardBody>
          <CCardTitle>
            {`Welcome, ${Utils.Users.determineName(null, me)}!`}
          </CCardTitle>
        </CCardBody>
      </CCard>
    )}
  </Providers.Users.Queries.AppMeProviderContext.Consumer>
);
