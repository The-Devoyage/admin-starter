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
import { AddressFormContent } from 'src/common';
import { CloseButton } from 'src/common/buttons/close-button';
import { CreateUserInput } from 'src/types/generated';
import { UserFormContent } from '../user-form-content';

interface CreateUserModalProps {
  form: FormikProps<CreateUserInput> | null;
  loading: boolean;
  createUserModalVisible: boolean;
  setCreateUserModalVisible: (v: boolean) => void;
}

export const CreateUserModal: FC<CreateUserModalProps> = ({
  form,
  loading,
  createUserModalVisible,
  setCreateUserModalVisible,
}) => (
  <CForm
    onSubmit={(e) => {
      e.preventDefault();
      form?.submitForm();
      setCreateUserModalVisible(false);
    }}
  >
    <CModal
      visible={createUserModalVisible}
      onClose={() => setCreateUserModalVisible(false)}
      scrollable
      portal={false}
    >
      <CModalHeader closeButton={false}>
        Create User
        <CloseButton onClick={() => setCreateUserModalVisible(false)} />
      </CModalHeader>
      <CModalBody>
        <UserFormContent form={form} loading={loading} />
        <AddressFormContent form={form} loading={loading} />
      </CModalBody>
      <CModalFooter className="justify-content-end">
        <CButton color="primary" type="submit">
          Create User
        </CButton>
      </CModalFooter>
    </CModal>
  </CForm>
);
