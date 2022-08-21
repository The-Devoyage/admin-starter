import {
  CButton,
  CDropdownDivider,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { CloseButton } from 'src/common/buttons/close-button';
import { AddressFormContent } from 'src/common/form-content';
import { UpdateUserInput } from 'src/types/generated';
import { UserFormContent } from '../user-form-content';

interface UpdateUserModalProps {
  form: FormikProps<UpdateUserInput> | null;
  visible: boolean;
  setVisible: (v: boolean) => void;
  loading: boolean;
}

export const UpdateUserModal: FC<UpdateUserModalProps> = ({
  form,
  visible,
  setVisible,
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
        Update User
        <CloseButton onClick={() => setVisible(false)} />
      </CModalHeader>
      <CModalBody>
        <UserFormContent form={form} loading={loading} />
        <CDropdownDivider />
        <AddressFormContent form={form} loading={loading} />
      </CModalBody>
      <CModalFooter className="justify-content-end">
        <CButton type="submit" color="primary">
          Update User
        </CButton>
      </CModalFooter>
    </CModal>
  </CForm>
);
