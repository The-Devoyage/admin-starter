import {
  CButton,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react';
import { Providers } from 'src/apollo';
import { RegisterFormContent } from 'src/components/auth/register';

export const CreateAccountModal = () => (
  <Providers.Accounts.Mutations.RegisterProviderContext.Consumer>
    {({ createAccountModalVisible, setCreateAccountModalVisible, form }) => (
      <CModal
        visible={createAccountModalVisible}
        onClose={() => setCreateAccountModalVisible(false)}
      >
        <CModalHeader>Create Account</CModalHeader>
        <CForm
          onSubmit={(e) => {
            e.preventDefault();
            form?.submitForm();
            setCreateAccountModalVisible(false);
          }}
        >
          <CModalBody>
            <RegisterFormContent form={form} disablePasswords />
          </CModalBody>
          <CModalFooter className="d-flex justify-content-end">
            <CButton type="submit">Create Account</CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    )}
  </Providers.Accounts.Mutations.RegisterProviderContext.Consumer>
);
