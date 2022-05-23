import {
  CButton,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react';
import { FC } from 'react';
import { Providers } from 'src/apollo';
import { Utils } from 'src/common';
import { CloseButton } from 'src/common/buttons/close-button';
import { UserMembershipFormContent } from '../user-membership-form-content';

export const InviteUserModal: FC = () => (
  <Providers.Users.Mutations.InviteUserProviderContext.Consumer>
    {({
      setInviteUserModalVisible,
      inviteUsersModalVisible,
      form,
      loading,
    }) => (
      <CForm
        onSubmit={(e) => {
          e.preventDefault();
          form?.submitForm();
          setInviteUserModalVisible(false);
        }}
      >
        <CModal
          visible={inviteUsersModalVisible}
          onClose={() => setInviteUserModalVisible(false)}
          scrollable
          portal={false}
        >
          <CModalHeader closeButton={false}>
            Add Membership
            <CloseButton onClick={() => setInviteUserModalVisible(false)} />
          </CModalHeader>
          <CModalBody>
            <UserMembershipFormContent form={form} loading={loading} />
          </CModalBody>
          <CModalFooter>
            <CButton
              type="submit"
              disabled={
                !Utils.isValidObjectId(
                  form?.values.payload.memberships?.account,
                )
              }
            >
              Add
            </CButton>
          </CModalFooter>
        </CModal>
      </CForm>
    )}
  </Providers.Users.Mutations.InviteUserProviderContext.Consumer>
);
