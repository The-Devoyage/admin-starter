import { CCard, CCardBody, CCardTitle } from '@coreui/react';
import { FC } from 'react';
import { Utils } from 'src/common';
import { User } from 'src/types/generated';

interface WelcomeCardProps {
  me: Pick<User, 'first_name' | 'last_name' | 'email'> | null;
}

export const WelcomeCard: FC<WelcomeCardProps> = ({ me }) => (
  <CCard>
    <CCardBody>
      <CCardTitle>
        {`Welcome, ${Utils.Users.determineName(null, me)}!`}
      </CCardTitle>
    </CCardBody>
  </CCard>
);
