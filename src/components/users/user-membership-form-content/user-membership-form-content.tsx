import {
  CCardTitle,
  CCol,
  CDropdownDivider,
  CFormCheck,
  CFormLabel,
  CRow,
} from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { LocalAddressFormContent } from 'src/common/form-content/local-address-form-content';
import { AccountSelect } from 'src/components/accounts';
import {
  InviteUserInput,
  MembershipStatusEnum,
  UpdateUserInput,
  UserFieldFiltersInput,
} from 'src/types/generated';
import { UserMembershipLocalFormContent } from '../user-membership-local-form-content';
import { UserMembershipStatusSelect } from '../user-membership-status-select';
import { UserRoleSelect } from '../user-role-select';
import { UserSelect } from '../user-select';

interface UpdateUserMembershipFormContentProps {
  form: FormikProps<UpdateUserInput> | FormikProps<InviteUserInput> | null;
  loading: boolean;
}

export const UserMembershipFormContent: FC<
  UpdateUserMembershipFormContentProps
> = ({ form, loading }) => {
  const userToUpdate = (userFieldFilters?: UserFieldFiltersInput) => {
    const _idFilters = userFieldFilters?._id;
    const _idFilter = _idFilters?.length ? _idFilters[0] : null;
    if (_idFilter?.string) {
      return _idFilter.string;
    }
    return undefined;
  };

  return (
    <>
      <CRow>
        <CCol lg={12} className="mb-3">
          <CFormLabel>User</CFormLabel>
          <UserSelect
            loading={loading}
            value={{
              value: {
                _id: userToUpdate(form?.initialValues.query),
              },
            }}
            handleChange={(v) =>
              form?.setFieldValue('query.user._id[0].string', v?.value?._id)
            }
          />
        </CCol>
        <CCol lg={12} className="mb-3">
          <CFormLabel>Account</CFormLabel>
          <AccountSelect
            loading={loading}
            value={{
              value: form?.initialValues.payload.memberships?.account,
            }}
            handleChange={(v) =>
              form?.setFieldValue('payload.memberships.account', v?.value)
            }
          />
        </CCol>
        <CCol lg={12} className="mb-3">
          <CFormLabel>Role</CFormLabel>
          <UserRoleSelect
            value={form?.values.payload.memberships?.role ?? 10}
            handleChange={(role) =>
              form?.setFieldValue('payload.memberships.role', role)
            }
          />
        </CCol>
        <CCol lg={12} className="mb-3">
          <CFormLabel>Status</CFormLabel>
          <UserMembershipStatusSelect
            value={
              form?.values.payload.memberships?.status ??
              MembershipStatusEnum.Pending
            }
            handleChange={(status) =>
              form?.setFieldValue('payload.memberships.status', status)
            }
          />
        </CCol>
        <CCol lg={12} className="mb-3">
          <CFormLabel>Default</CFormLabel>
          <CFormCheck
            checked={form?.values.payload.memberships?.default ?? false}
            name="payload.memberships.default"
            onChange={(e) =>
              form?.setFieldValue(
                'payload.memberships.default',
                e.currentTarget.checked,
              )
            }
            label="Account Owner"
          />
        </CCol>
      </CRow>
      <CDropdownDivider className="mb-3" />
      <CCardTitle component="h6">Local Details</CCardTitle>
      <UserMembershipLocalFormContent form={form} loading={loading} />
      <LocalAddressFormContent form={form} loading={loading} />
    </>
  );
};
