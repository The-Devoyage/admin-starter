import {
  CButton,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CSpinner,
} from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { RegisterFormContent } from 'src/components/auth/register';
import { RegisterInput } from 'src/types/generated';

interface CreateAccountModalProps {
  visible: boolean;
  setVisible: (b: boolean) => void;
  form: FormikProps<RegisterInput> | null;
  loading: boolean;
}

export const CreateAccountModal: FC<CreateAccountModalProps> = ({
  visible,
  setVisible,
  form,
  loading,
}) => (
  <CModal visible={visible} onClose={() => setVisible(false)}>
    <CModalHeader>Create Account</CModalHeader>
    <CForm
      onSubmit={(e) => {
        e.preventDefault();
        form?.submitForm();
      }}
    >
      <CModalBody>
        <RegisterFormContent form={form} disablePasswords />
      </CModalBody>
      <CModalFooter className="d-flex justify-content-end">
        <CButton type="submit" disabled={loading || !form?.dirty}>
          {loading ? <CSpinner size="sm" /> : 'Create'}
        </CButton>
      </CModalFooter>
    </CForm>
  </CModal>
);
