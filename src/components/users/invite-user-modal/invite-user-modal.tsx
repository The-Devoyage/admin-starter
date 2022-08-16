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
import { InviteUserInput, User } from 'src/types/generated';
import { UserMembershipFormContent } from '../user-membership-form-content';

interface InviteUserModalProps {
  form: FormikProps<InviteUserInput> | null;
  setInviteUserModalVisible: (v: boolean) => void;
  inviteUserModalVisible: boolean;
  loading: boolean;
  handleSearch: (v: string) => void;
  users: Pick<User, '_id' | 'email' | 'first_name' | 'last_name'>[];
}

export const InviteUserModal: FC<InviteUserModalProps> = ({
  inviteUserModalVisible,
  setInviteUserModalVisible,
  form,
  loading,
  users,
  handleSearch,
}) => (
  <CForm
    onSubmit={(e) => {
      e.preventDefault();
      form?.submitForm();
      setInviteUserModalVisible(false);
    }}
  >
    <CModal
      visible={inviteUserModalVisible}
      onClose={() => setInviteUserModalVisible(false)}
      scrollable
      portal={false}
    >
      <CModalHeader closeButton={false}>
        Add Membership
        <CloseButton onClick={() => setInviteUserModalVisible(false)} />
      </CModalHeader>
      <CModalBody>
        <UserMembershipFormContent
          form={form}
          loading={loading}
          users={users}
          handleSearch={handleSearch}
        />
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
