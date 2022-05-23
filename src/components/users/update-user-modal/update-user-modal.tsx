import {
  CButton,
  CDropdownDivider,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react';
import { Providers } from 'src/apollo';
import { CloseButton } from 'src/common/buttons/close-button';
import { AddressFormContent } from 'src/common/form-content';
import { UserFormContent } from '../user-form-content';

export const UpdateUserModal = () => (
  <Providers.Users.Mutations.UpdateUserProviderContext.Consumer>
    {({ form, updateUserModalVisible, setUpdateUserModalVisible, loading }) => (
      <CForm
        onSubmit={(e) => {
          e.preventDefault();
          form?.submitForm();
          setUpdateUserModalVisible(false);
        }}
      >
        <CModal
          visible={updateUserModalVisible}
          onClose={() => setUpdateUserModalVisible(false)}
          scrollable
          portal={false}
        >
          <CModalHeader closeButton={false}>
            Update User
            <CloseButton onClick={() => setUpdateUserModalVisible(false)} />
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
    )}
  </Providers.Users.Mutations.UpdateUserProviderContext.Consumer>
);
