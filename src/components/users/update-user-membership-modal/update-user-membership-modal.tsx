import {
  CButton,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react';
import { Providers } from 'src/apollo';
import { CloseButton } from 'src/common/buttons/close-button';
import { useNavigate } from 'react-router-dom';
import { UserMembershipFormContent } from '../user-membership-form-content';

export const UpdateUserMembershipModal = () => {
  const navigate = useNavigate();

  return (
    <Providers.Users.Mutations.UpdateUserProviderContext.Consumer>
      {({
        form,
        updateUserMembershipModalVisible,
        setUpdateUserMembershipModalVisible,
        loading,
      }) => (
        <CForm
          onSubmit={(e) => {
            e.preventDefault();
            form?.submitForm();
            setUpdateUserMembershipModalVisible(false);
          }}
        >
          <CModal
            visible={updateUserMembershipModalVisible}
            onClose={() => setUpdateUserMembershipModalVisible(false)}
            scrollable
            portal={false}
          >
            <CModalHeader closeButton={false}>
              Update User Membership
              <CloseButton
                onClick={() => setUpdateUserMembershipModalVisible(false)}
              />
            </CModalHeader>
            <CModalBody>
              <UserMembershipFormContent form={form} loading={loading} />
            </CModalBody>
            <CModalFooter className="d-flex justify-content-between">
              <CButton
                color="secondary"
                onClick={() =>
                  navigate(
                    `/accounts/account?account_id=${form?.values.payload.memberships?.account}`,
                  )
                }
              >
                View Account
              </CButton>
              <CButton
                id="submit_update_membership"
                type="submit"
                disabled={loading || !form?.dirty}
              >
                Update Membership
              </CButton>
            </CModalFooter>
          </CModal>
        </CForm>
      )}
    </Providers.Users.Mutations.UpdateUserProviderContext.Consumer>
  );
};
