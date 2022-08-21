import {
  CButton,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { Utils } from 'src/common';
import { CloseButton } from 'src/common/buttons/close-button';
import { InviteUserInput } from 'src/types/generated';
import { UserMembershipFormContent } from '../user-membership-form-content';

interface InviteUserModalProps {
  form: FormikProps<InviteUserInput> | null;
  setVisible: (v: boolean) => void;
  visible: boolean;
  loading: boolean;
}

export const InviteUserModal: FC<InviteUserModalProps> = ({
  visible,
  setVisible,
  form,
  loading,
}) => (
  <CForm
    onSubmit={(e) => {
      e.preventDefault();
      form?.submitForm();
      setVisible(false);
    }}
  >
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      scrollable
      portal={false}
    >
      <CModalHeader closeButton={false}>
        Add Membership
        <CloseButton onClick={() => setVisible(false)} />
      </CModalHeader>
      <CModalBody>
        <UserMembershipFormContent form={form} loading={loading} />
      </CModalBody>
      <CModalFooter>
        <CButton
          type="submit"
          disabled={
            !Utils.isValidObjectId(form?.values.payload.memberships?.account) ||
            !form?.dirty
          }
        >
          Add
        </CButton>
      </CModalFooter>
    </CModal>
  </CForm>
);
