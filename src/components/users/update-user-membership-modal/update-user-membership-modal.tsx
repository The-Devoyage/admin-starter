import {
  CButton,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react';
import { CloseButton } from 'src/common/buttons/close-button';
import { useNavigate } from 'react-router-dom';
import { UserMembershipFormContent } from '../user-membership-form-content';
import { FormikProps } from 'formik';
import { UpdateUserInput, User } from 'src/types/generated';
import { FC } from 'react';

interface UpdateUserMembershipModalProps {
  form: FormikProps<UpdateUserInput> | null;
  loading: boolean;
  setUpdateUserMembershipModalVisible: (v: boolean) => void;
  updateUserMembershipModalVisible: boolean;
  users: Pick<User, '_id' | 'email' | 'first_name' | 'last_name'>[];
  handleSearch: (v: string) => void;
}

export const UpdateUserMembershipModal: FC<UpdateUserMembershipModalProps> = ({
  form,
  loading,
  setUpdateUserMembershipModalVisible,
  updateUserMembershipModalVisible,
  users,
  handleSearch,
}) => {
  const navigate = useNavigate();

  return (
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
          <UserMembershipFormContent
            form={form}
            loading={loading}
            users={users}
            handleSearch={handleSearch}
          />
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
  );
};
