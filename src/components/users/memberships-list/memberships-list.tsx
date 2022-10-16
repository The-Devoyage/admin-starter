import CIcon from '@coreui/icons-react';
import {
  CAlert,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { Utils } from 'src/common';
import {
  MembershipInput,
  UpdateUserInput,
  UserPage_GetUsersQuery,
} from 'src/types/generated';
import { MembershipsListLoading } from './memberships-list-loading';

interface MembershipsListProps {
  memberships: UserPage_GetUsersQuery['getUsers']['data'][0]['memberships'];
  loading: boolean;
  form: FormikProps<UpdateUserInput> | null;
  setVisible: (v: boolean) => void;
}

type UserInputMembershipInput = Pick<
  UpdateUserInput,
  'payload' & { memberships: MembershipInput }
>;

export const MembershipsList: FC<MembershipsListProps> = ({
  memberships,
  loading,
  form,
  setVisible,
}) => {
  if (loading) {
    return <MembershipsListLoading />;
  }

  const generateInitialMembershipValues = (
    membership: UserPage_GetUsersQuery['getUsers']['data'][0]['memberships'][0],
  ) => {
    const initialMembershipValues: UserInputMembershipInput = {
      memberships: {
        account: membership.account._id,
        role: membership.role,
        status: membership.status,
        default: membership.default,
        local: {
          first_name: membership?.local?.first_name,
          last_name: membership?.local?.last_name,
          phone: membership?.local?.phone,
          about: membership.local?.about,
          image: membership.local?.image?._id,
          address: {
            zip: membership.local?.address?.zip,
            city: membership.local?.address?.city,
            state: membership.local?.address?.state,
            lineOne: membership.local?.address?.lineOne,
            lineTwo: membership.local?.address?.lineTwo,
          },
        },
      },
    };

    return initialMembershipValues;
  };

  if (!memberships.length) {
    return (
      <CAlert color="info" className="mb-0">
        This user does not have any memberships.
      </CAlert>
    );
  }

  return (
    <CTable responsive hover borderless small className="text-center">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>Account</CTableHeaderCell>
          <CTableHeaderCell>Owner</CTableHeaderCell>
          <CTableHeaderCell>Role</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {memberships.map((m) => (
          <CTableRow
            key={m._id}
            role="button"
            onClick={() => {
              const initialMembershipValues =
                generateInitialMembershipValues(m);
              form?.resetForm({
                values: {
                  query: form.values.query,
                  payload: initialMembershipValues,
                },
              });
              setVisible(true);
            }}
          >
            <CTableDataCell>
              <CTooltip content={m.status}>
                <CIcon icon={Utils.Memberships.determineIcon(m.status)} />
              </CTooltip>
            </CTableDataCell>
            <CTableDataCell>{m.account._id}</CTableDataCell>
            <CTableDataCell>
              {Utils.Users.determineName(m.account, null)}
            </CTableDataCell>
            <CTableDataCell style={{ textTransform: 'capitalize' }}>
              {Utils.Memberships.determineRoleName(m.role)}
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};
