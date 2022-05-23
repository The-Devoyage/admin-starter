import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import { CButtonProps } from '@coreui/react/dist/components/button/CButton';
import { FC, ReactNode, useState } from 'react';

interface VerifyButtonProps extends CButtonProps {
  children: ReactNode;
  warning: string;
}

export const VerifyButton: FC<VerifyButtonProps> = (props) => {
  const { warning, children, onClick, ...rest } = props;
  const [visible, setVisible] = useState(false);
  return (
    <>
      <CButton onClick={() => setVisible(true)}>{children}</CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Are You Sure?</CModalTitle>
        </CModalHeader>
        <CModalBody>{warning}</CModalBody>
        <CModalFooter className="d-flex justify-content-between">
          <CButton color="danger" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton
            color="success"
            {...rest}
            onClick={(e) => {
              if (onClick) {
                onClick(e);
              }
              setVisible(false);
            }}
          >
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
