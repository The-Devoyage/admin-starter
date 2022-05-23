import {
  CButton,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react';
import { Providers } from 'src/apollo';
import { AddressFormContent } from 'src/common';
import { CloseButton } from 'src/common/buttons/close-button';
import { UserFormContent } from '../user-form-content';

export const CreateUserModal = () => (
  <Providers.Users.Mutations.CreateUserProviderContext.Consumer>
    {({ form, createUserModalVisible, setCreateUserModalVisible, loading }) => (
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
    )}
  </Providers.Users.Mutations.CreateUserProviderContext.Consumer>
);
