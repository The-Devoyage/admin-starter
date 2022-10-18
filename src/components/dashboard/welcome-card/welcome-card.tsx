import { CCallout, CCard, CCardBody, CCardHeader } from '@coreui/react';
import { FC } from 'react';
import { Utils } from 'src/common';
import { User } from 'src/types/generated';

interface WelcomeCardProps {
  me: Pick<User, 'first_name' | 'last_name' | 'email'> | null;
}

export const WelcomeCard: FC<WelcomeCardProps> = ({ me }) => (
  <CCard>
    <CCardHeader>
      {`Welcome, ${Utils.Users.determineName(null, me)}!`}
    </CCardHeader>
    <CCardBody>
      <CCallout
        color="success"
        className="mb-3"
        style={{ backgroundColor: 'white' }}
      >
        Your operations portal is designed to make it easy to manage the assets
        of your business including Users, File Uploads (Media), and Accounts.
      </CCallout>
    </CCardBody>
  </CCard>
);
