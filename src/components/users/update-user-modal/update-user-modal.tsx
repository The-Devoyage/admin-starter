import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
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
        <CDropdownDivider className="mb-3" />
        <CAccordion>
          <CAccordionItem>
            <CAccordionHeader>Address</CAccordionHeader>
            <CAccordionBody>
              <AddressFormContent form={form} loading={loading} />
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </CModalBody>
      <CModalFooter className="justify-content-end">
        <CButton type="submit" color="primary">
          Update User
        </CButton>
      </CModalFooter>
    </CModal>
  </CForm>
);
