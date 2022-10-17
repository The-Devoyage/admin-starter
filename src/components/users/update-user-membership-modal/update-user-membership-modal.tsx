import { FC } from 'react';
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
import { FormikProps } from 'formik';
import { UpdateUserInput } from 'src/types/generated';
import { UserMembershipFormContent } from '../user-membership-form-content';

interface UpdateUserMembershipModalProps {
  form: FormikProps<UpdateUserInput> | null;
  loading: boolean;
  setVisible: (v: boolean) => void;
  visible: boolean;
}

export const UpdateUserMembershipModal: FC<UpdateUserMembershipModalProps> = ({
  form,
  loading,
  setVisible,
  visible,
}) => {
  const navigate = useNavigate();

  return (
    <CForm
      onSubmit={(e) => {
        e.preventDefault();
        form?.submitForm();
      }}
    >
      <CModal
        visible={visible}
        onClose={() => {
          form?.resetForm();
          setVisible(false);
        }}
        scrollable
        portal={false}
      >
        <CModalHeader closeButton={false}>
          Update User Membership
          <CloseButton onClick={() => setVisible(false)} />
        </CModalHeader>
        <CModalBody>
          <UserMembershipFormContent
            form={form}
            loading={loading}
            showError={['USER_INPUT']}
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
