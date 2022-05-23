import { cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton } from '@coreui/react';
import { CButtonProps } from '@coreui/react/dist/components/button/CButton';
import { FC } from 'react';

export const CloseButton: FC<CButtonProps> = ({ ...props }) => (
  <CButton color="light" type="button" {...props}>
    <CIcon icon={cilX} />
  </CButton>
);
